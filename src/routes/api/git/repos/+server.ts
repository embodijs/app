import { isAuthenticated } from '$lib/helpers/auth.server';
import { loadRepositories } from '$infra/github/repo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllRepositories } from '$epp/repo.server';
import { createSessionUser } from '$core/user';

export type APIGet = Awaited<ReturnType<typeof loadRepositories>>;
export const GET: RequestHandler = async ({ locals }) => {
	isAuthenticated(locals);
	const sessionUser = createSessionUser(locals.user, locals.session!);
	const repos = await getAllRepositories(sessionUser);
	return json(repos);
};
