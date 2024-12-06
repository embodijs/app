import { OAuth2RequestError } from 'arctic';
import { github, setLuciaSessionAndCookie } from '$infra/auth/git.server.js';

import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { GitHubUser } from '$core/git';
import { upsertUserByGithubId } from '$epp/auth.server.js';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	const redirectTo = event.cookies.get('login_redirect') ?? '/';
	event.cookies.delete('github_oauth_state', { path: '/' });
	event.cookies.delete('login_redirect', { path: '/' });

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
		const user = await upsertUserByGithubId(githubUser);
		await setLuciaSessionAndCookie(event, tokens.accessToken, user);
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

	return redirect(302, redirectTo);
}
