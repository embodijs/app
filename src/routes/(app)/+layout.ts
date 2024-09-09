import type { APIUserData } from '$domain/account/exports';
import { isAuthenticated } from '$lib/helpers/api';
import type { LayoutLoad } from './$types';

export const ssr = true;
export const prerender = false;

export const load: LayoutLoad = async ({ fetch, url }) => {
	const userRes = await fetch('/account/user');
	isAuthenticated(userRes, url);
	const user = (await userRes.json()) as APIUserData;

	return {
		user
	};
};
