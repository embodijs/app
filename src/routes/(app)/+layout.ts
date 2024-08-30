import type { APIUserData } from '$domain/account/exports';
import type { LayoutLoad } from './$types';

export const ssr = true;
export const prerender = false;

export const load: LayoutLoad = async ({ fetch }) => {
	const userRes = await fetch('/account/user');
	const user = (await userRes.json()) as APIUserData;

	return {
		user
	};
};
