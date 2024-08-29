import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.route.id || !event.route.id.startsWith('(app)')) {
		return redirect(302, '/');
	}

	const response = await resolve(event);
	return response;
};
