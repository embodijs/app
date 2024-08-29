import type { Cookies } from '@sveltejs/kit';
import type { UserDatabase } from './definitions';
import { lucia } from './auth.server';

export const setLuciaSessionAndCookie = async (cookies: Cookies, user: UserDatabase) => {
	const { id } = user;
	const session = await lucia.createSession(id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};
