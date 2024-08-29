import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ServerData } from './definitions';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	return json({
		username: locals.user.username
	} satisfies ServerData);
};
