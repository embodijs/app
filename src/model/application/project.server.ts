import type { GitRepo } from '$core/git';
import type { NewProject, Project } from '$core/project';
import { generateProjectId } from '$core/project';
import type { NewRepo, Repo } from '$core/repo';
import { isExistingRepo, isNewRepo } from '$core/repo/utils';
import type { SessionUser } from '$core/user';
import { activatePages } from '$infra/github/pages';
import { createRepository } from '$infra/github/repo';
import { createProject as createProjectInfra } from '$infra/project.server';
import { createRepo } from '$infra/repo.server';
import { addDate, g, pipe, exec } from 'pipe-and-combine';

export const activateProjectPageIfNecessary = () =>
	g(async (data: { project: Project; repo: Repo; user: SessionUser; isNewRepo: boolean }) => {
		const { repo, project, user } = data;
		if (!isNewRepo) {
			await activatePages(project, repo, user);
		}
		return data;
	});

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

export const createRepoIfNeeded = (
	createGithubRepo: (repo: NewRepo, user: SessionUser) => Promise<GitRepo>
) =>
	g(async (data: { project: Omit<Project, 'repoId'>; repo: NewRepo | Repo; user: SessionUser }) => {
		const { project, repo, user } = data;
		if (isExistingRepo(repo)) {
			return {
				...data,
				repo,
				project: {
					...project,
					repoId: repo.id
				},
				isNewRepo: false
			};
		}

		const { id } = await createGithubRepo(repo, user);
		return {
			...data,
			project: {
				...project,
				repoId: id
			},
			repo: {
				...repo,
				id
			},
			isNewRepo: true
		};
	});

export const createProject = pipe(
	prepareCreateProjectPipe(),
	createRepoIfNeeded(createRepository),
	addDate('timestamp'),
	exec(createRepo, ['repo', 'timestamp']),
	exec(createProjectInfra, ['project', 'timestamp']),
	activateProjectPageIfNecessary()
);
