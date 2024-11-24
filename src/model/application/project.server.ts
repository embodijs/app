import { createProjectFromNewProject, hasExistingRepository } from '$core/project';
import type { NewProject, Project } from '$core/project';
import type { SessionUser } from '$core/user';
import { activatePages } from '$infra/github/pages';
import { createRepository } from '$infra/github/repo';
import { createProject as createProjectInfra } from '$infra/project.server';

export async function createProject(newProject: NewProject, user: SessionUser) {
	if (hasExistingRepository(newProject)) {
		const project = createProjectFromNewProject(newProject);
		await createProjectInfra(project);
		await activateProjectPageIfNecessary(project);
	} else {
		const { id } = await createRepository(newProject, user);
		const project = createProjectFromNewProject({ ...newProject, repoId: id });
		await createProjectInfra(project);
		await activateProjectPageIfNecessary(project);
	}
}

export async function activateProjectPageIfNecessary(project: Project) {
	if (project.activePage) {
		return;
	}
	await activatePages(project);
}
