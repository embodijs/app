import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { AccountServerData } from './definitions';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	return json({
		name: locals.user.name,
		platformData: locals.user.platformData
	} satisfies AccountServerData);
};
