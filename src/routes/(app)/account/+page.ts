import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { ServerData } from './definitions';

export const load: PageLoad = async ({ fetch, url }) => {
	const res = await fetch(url);
	if (res.ok) {
		const data = (await res.json()) as ServerData;
		console.log(data);
		return {
			username: data.username
		};
	}
	redirect(302, '/');
};
