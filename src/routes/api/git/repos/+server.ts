import { isAuthenticated } from '$infra/auth/auth.server';
import { loadRepositories } from '$infra/github/repo';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	isAuthenticated(locals);
	return loadRepositories(locals.session.accessToken);
};
