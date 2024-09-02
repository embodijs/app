import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/git/repos');
	const repos = await response.json();
	console.log('repos', repos);
	return {
		repos
	};
};
