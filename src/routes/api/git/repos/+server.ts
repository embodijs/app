import { isAuthenticated } from '$domain/auth/exports.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, fetch }) => {
	isAuthenticated(locals);
	const repos = await fetch('https://api.github.com/user/repos', {
		headers: {
			Authorization: `Bearer ${locals.session.accessToken}`
		}
	});

	return new Response(repos.body);
};
