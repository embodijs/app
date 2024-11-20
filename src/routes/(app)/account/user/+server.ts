import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AccountServerData } from '../definitions';
import { isAuthenticated } from '$lib/helpers/auth.server.js';

export const GET: RequestHandler = async ({ locals }) => {
	isAuthenticated(locals);
	return json({
		platformData: locals.user.platformData,
		name: locals.user.name,
		avatar: locals.user.avatarUrl ?? undefined
	} satisfies AccountServerData);
};
