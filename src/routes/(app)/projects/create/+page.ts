import type { PageLoad } from './$types';
import { isAuthenticated } from '$lib/helpers/api';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { APIGet } from '$api/git/repos/+server';
import { createSchema } from '$def/project';

export const load: PageLoad = async ({ fetch, url }) => {
	const response = await fetch('/api/git/repos');
	isAuthenticated(response, url);
	const repos: APIGet = await response.json();
	return {
		superForm: await superValidate(valibot(createSchema)),
		repos
	};
};
