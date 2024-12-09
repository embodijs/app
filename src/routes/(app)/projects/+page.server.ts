import * as project from '$epp/project.server';
import { isAuthenticated } from '$lib/helpers/auth.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	isAuthenticated(locals);
	const projects = await project.allProjects();
	return {
		projects
	};
};
