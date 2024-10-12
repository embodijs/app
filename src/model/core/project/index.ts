import { generateId, TYPEID } from '$lib/typeid';
import type { NewProject, Project } from '$def/project';
import type { SomeRecord } from '$lib/helpers/type';

export function createProjectFromNewProject(
	project: NewProject & Required<Pick<NewProject, 'repoId'>>
): Project {
	const id = generateProjectId();
	return {
		activePage: false,
		id,
		...project
	};
}

export function generateProjectId() {
	return generateId(TYPEID.PROJECT);
}

export function isNewProject(project: SomeRecord): project is NewProject {
	return !project.id;
}

export function hasExistingRepository(
	project: NewProject
): project is NewProject & Required<Pick<NewProject, 'repoId'>> {
	return 'repoId' in project;
}
