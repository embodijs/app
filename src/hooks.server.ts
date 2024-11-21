import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';
import { error, type Handle, type HandleServerError } from '@sveltejs/kit';
import * as auth from '$infra/auth/lucia.server.js';
import { NotAuthorizedException } from '$def/exceptions';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const handleParaglide: Handle = i18n.handle();
export const handle: Handle = sequence(handleAuth, handleParaglide);

export const handleError: HandleServerError = async ({ error: exception }) => {
	console.error(exception);

	if (exception instanceof NotAuthorizedException) {
		error(401, 'Not authorized');
	}
};
