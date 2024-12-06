import { generateId, TYPEID } from '$lib/typeid';
import type { GitHubRepo, GitRepo } from './types';

export const convertGithubToRepo = (repo: GitHubRepo): GitRepo => ({
	id: generateId(TYPEID.GITHUB, repo.id),
	name: repo.name,
	fullName: repo.full_name,
	owner: repo.owner.login,
	ownerId: repo.owner.id.toString(),
	private: repo.private,
	description: repo.description,
	defaultBranch: repo.default_branch,
	hasPages: repo.has_pages
});
