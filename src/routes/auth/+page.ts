import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	return {
		redirectTo: url.searchParams.get('redirect')
	};
};
