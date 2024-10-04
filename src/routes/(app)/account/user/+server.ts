import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AccountServerData } from '../definitions';
import { isAuthenticated } from '$infra/auth/auth.server';

export const GET: RequestHandler = async ({ locals }) => {
	isAuthenticated(locals);
	return json({
		username: locals.user.githubUsername,
		name: locals.user.name,
		avatar: locals.user.avatarUrl ?? undefined
	} satisfies AccountServerData);
};
