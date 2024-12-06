import * as project from '$epp/project.server';

export const load = async () => {
	const projects = await project.allProjects();
	return {
		projects
	};
};
