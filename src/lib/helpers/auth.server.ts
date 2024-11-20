import { error } from '@sveltejs/kit';

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
