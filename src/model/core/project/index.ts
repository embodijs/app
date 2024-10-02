import { generateId, TYPEID } from '$lib/typeid';
import type { NewProject, Project } from '$validation/project';

export function createProjectFromNewProject(
	project: NewProject & Required<Pick<NewProject, 'repoId'>>
): Project {
	const id = generateProjectId();
	return {
		...project,
		id
	};
}

export function generateProjectId() {
	return generateId(TYPEID.PROJECT);
}
