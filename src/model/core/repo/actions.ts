import type { GitRepo } from '$core/git';
import type { Project } from '$core/project';
import type { SessionUser } from '$core/user';
import { g } from 'pipe-and-combine';
import type { NewRepo, Repo } from './types';
import { isExistingRepo } from './utils';

export const createIfNeeded = (
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
