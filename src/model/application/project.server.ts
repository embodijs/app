import { createProjectFromNewProject, hasExistingRepository } from '$core/project';
import type { NewProject } from '$def/project';
import { createRepository } from '$infra/github/repo';
import { createProject as createProjectInfra } from '$infra/project.server';

export async function createProject(newProject: NewProject, user: { accessTocken: string }) {
	if (hasExistingRepository(newProject)) {
		const project = createProjectFromNewProject(newProject);
		createProjectInfra(project);
	} else {
		const { id } = await createRepository(newProject, user.accessTocken);
		const project = createProjectFromNewProject({ ...newProject, repoId: id });
		createProjectInfra(project);
	}
}
