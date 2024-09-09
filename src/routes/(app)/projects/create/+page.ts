import type { PageLoad } from './$types';
import { isAuthenticated } from '$lib/helpers/api';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { APIData } from '$api/git/repos/schema';
import { schema } from '../definitions';

export const load: PageLoad = async ({ fetch, url }) => {
	const response = await fetch('/api/git/repos');
	isAuthenticated(response, url);
	const repos: APIData = await response.json();
	return {
		superForm: await superValidate(valibot(schema)),
		repos
	};
};
