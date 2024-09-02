import type { PageLoad } from './$types';
import { isAuthenticated } from '$lib/helpers/api';
import type { APIData } from '$api/git/repos/schema';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/git/repos');
	isAuthenticated(response);
	const repos: APIData = await response.json();
	console.log('repos', repos);
	return {
		repos
	};
};
