import { OAuth2RequestError } from 'arctic';
import { github, lucia } from '../../auth.server';

import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { readUserByGithubId, writeUser } from '../../datasource.server';
import { generateId, TYPEID } from '$lib/typeid';

interface GitHubUser {
	id: number;
	login: string;
}

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return error(400, 'Invalid state');
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await readUserByGithubId(githubUser.id);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(TYPEID.USER);

			await writeUser({
				id: userId,
				githubId: githubUser.id,
				username: githubUser.login
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return error(400, e.message);
		}
		if (e instanceof Error) {
			console.error(e);
			console.error(e.stack);
		} else {
			console.error(e);
		}
		return error(500);
	}

	return redirect(302, '/dashboard');
}
