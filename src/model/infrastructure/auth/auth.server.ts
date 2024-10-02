import { Lucia, TimeSpan, type Session, type User } from 'lucia';
import { dev } from '$app/environment';
import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$db/init.server';
import jwt from 'jsonwebtoken';
import { sessions, users } from '$db/schema';
import type { InferSelectModel } from 'drizzle-orm';
import fs from 'fs';
import { error, type Cookies } from '@sveltejs/kit';
import type { UserDatabase } from '$def/user';

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);
const githubPrivateKey = fs.readFileSync('Embodi-Localhost-Private-Key.pem', 'utf8');

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(1, 'd'),
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			id: attributes.id,
			githubUsername: attributes.githubUsername,
			githubId: attributes.githubId,
			name: attributes.name,
			avatarUrl: attributes.avatarUrl,
			email: attributes.email
		};
	},
	getSessionAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseSessionAttributes
			accessToken: attributes.accessToken
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: InferSelectModel<typeof users>;
		DatabaseSessionAttributes: {
			accessToken: string;
		};
	}
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const generateGithubJWT = () => {
	const payload = {
		iss: GITHUB_CLIENT_ID,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 10 * 60
	};
	const token = jwt.sign(payload, githubPrivateKey, { algorithm: 'RS256' });
	return token;
};

export const setLuciaSessionAndCookie = async (
	cookies: Cookies,
	token: string,
	user: UserDatabase
) => {
	const { id } = user;
	const session = await lucia.createSession(id, {
		accessToken: token
	});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export function isAuthenticated(
	locals: App.Locals
): asserts locals is { session: Session; user: User } {
	if (locals.session && locals.user && locals.session.accessToken) return;
	error(401, 'Unauthorized');
}

export const getAccessToken = (locals: { session: Session }): string => {
	if (!locals.session.accessToken) throw new Error('No access token');
	return locals.session.accessToken;
};
