import { GitHubExceptions, NotAuthorizedException } from '$def/exceptions';
import type { GitRepo } from '$def/git';
import type { GitHubRepo } from '$def/github';
import type { NewProject } from '$def/project';
import type { SessionUser } from '$def/user';

export async function loadRepositories(user: SessionUser): Promise<GitRepo[]> {
	const response = await fetch('https://api.github.com/user/repos', {
		headers: {
			Authorization: `Bearer ${user.accessToken}`
		}
	});

	if (!response.ok) {
		if (response.status === 401) {
			throw new NotAuthorizedException();
		}
		throw new GitHubExceptions(response.statusText);
	}

	const repos = (await response.json()) as GitHubRepo[];
	return repos.map((git) => ({
		id: git.id.toString(),
		name: git.name,
		fullName: git.full_name,
		owner: git.owner.login,
		ownerId: git.owner.id.toString(),
		private: git.private,
		description: git.description,
		defaultBranch: git.default_branch,
		activePage: git.has_pages
	}));
}

export async function createRepository(
	project: NewProject,
	user: SessionUser
): Promise<{ id: string }> {
	const requestBody = {
		name: project.repo,
		description: project.repoDescription,
		private: project.repoPrivate
	};

	const response = await fetch('https://api.github.com/user/repos', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${user.accessToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});
	if (!response.ok) {
		throw new Error('Failed to create repository');
	}

	const { id } = await response.json();
	return { id: id.toString() };
}
