import { createProjectFromNewProject, hasExistingRepository } from '$core/project';
import type { NewProject, ProjectWithRepo } from '$core/project';
import type { SessionUser } from '$core/user';
import { activatePages } from '$infra/github/pages';
import { createRepository } from '$infra/github/repo';
import { createProject as createProjectInfra } from '$infra/project.server';

export async function createProject(newProject: NewProject, user: SessionUser) {
	if (hasExistingRepository(newProject)) {
		const project = createProjectFromNewProject(newProject, newProject.repo);
		await createProjectInfra(project);
		await activateProjectPageIfNecessary(project);
	} else {
		const { id } = await createRepository(newProject.repo, user);
		const project = createProjectFromNewProject(newProject, {
			...newProject.repo,
			hasPages: newProject.repo.hasPages ?? true,
			id
		});
		await createProjectInfra(project);
		await activateProjectPageIfNecessary(project);
	}
}

export async function activateProjectPageIfNecessary(project: ProjectWithRepo) {
	if (project.repo.hasPages === false) {
		return;
	}
	await activatePages(project);
}
