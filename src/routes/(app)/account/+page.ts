import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const res = await fetch(url);
	if (res.ok) {
		return res.json();
	}
};
