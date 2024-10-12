import { redirect, error, type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { lucia } from '$infra/auth/auth.server';
import { NotAuthorizedException } from '$def/exceptions';

const handleLuciaSession: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		if (event.route.id && event.route.id.startsWith('(app)')) {
			return redirect(302, '/auth');
		}
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle = sequence(handleLuciaSession);

export const handleError: HandleServerError = async ({ error: exception }) => {
	console.error(exception);

	if (exception instanceof NotAuthorizedException) {
		error(401, 'Not authorized');
	}
};
