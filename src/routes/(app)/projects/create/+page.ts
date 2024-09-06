import type { PageLoad } from './$types';
import { isAuthenticated } from '$lib/helpers/api';
import type { APIData } from '$api/git/repos/schema';

export const load: PageLoad = async ({ fetch, url }) => {
	const response = await fetch('/api/git/repos');
	isAuthenticated(response, url);
	const repos: APIData = await response.json();
	return {
		repos
	};
};
