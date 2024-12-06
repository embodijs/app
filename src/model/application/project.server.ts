import { git } from '$core/git';
import type { NewProject } from '$core/project';
import { generateProjectId } from '$core/project';
import { repo } from '$core/repo';
import type { SessionUser } from '$core/user';
import { infra } from '$infra';
import { addDate, pipe, exec } from 'pipe-and-combine';

export const prepareCreateProjectPipe = () => (newProject: NewProject, user: SessionUser) => {
	const { repo, ...project } = newProject;
	return {
		project: {
			id: generateProjectId(),
			...project
		},
		repo,
		user
	};
};

export const createProject = pipe(
	prepareCreateProjectPipe(),
	repo.createIfNeeded(infra.git.repo.create),
	addDate('timestamp'),
	exec(infra.repo.store, ['repo', 'timestamp']),
	exec(infra.project.store, ['project', 'timestamp']),
	git.activatePagesIfNecessary(infra.git.pages.activate)
);

export const allProjects = pipe(infra.project.all);
