import { generateId, TYPEID } from '$lib/typeid';
import type { NewProject, ProjectWithRepo } from './types';
import type { SomeRecord } from '$lib/helpers/type';
import type { Repo } from '$core/repo';

export function createProjectFromNewProject(project: NewProject, repo: Repo): ProjectWithRepo {
	const id = generateProjectId();
	return {
		id,
		...project,
		repo
	};
}

export function generateProjectId() {
	return generateId(TYPEID.PROJECT);
}

export function isNewProject(project: SomeRecord): project is NewProject {
	return !project.id;
}

export function hasExistingRepository(project: NewProject): project is NewProject & {
	repo: Repo;
} {
	return 'repo' in project && 'id' in project.repo && project.repo.id != null;
}
