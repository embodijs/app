import type { Project } from '$core/project';
import type { Repo } from '$core/repo';
import type { SessionUser } from '$core/user';
import { g } from 'pipe-and-combine';

export const activatePagesIfNecessary = (
	activatePages: (project: Project, repo: Repo, user: SessionUser) => unknown | Promise<unknown>
) =>
	g(async (data: { project: Project; repo: Repo; user: SessionUser; isNewRepo: boolean }) => {
		const { repo, project, user } = data;
		if (!data.isNewRepo) {
			await activatePages(project, repo, user);
		}
		return data;
	});
