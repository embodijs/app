import { GitHubExceptions, NotAuthorizedException } from '$core/exceptions';
import type { GitRepo, GitHubRepo } from '$core/git';
import { convertGithubToRepo } from '$core/git/utils';
import type { NewRepo } from '$core/repo';
import type { SessionUser } from '$core/user';

export async function load(user: SessionUser): Promise<GitRepo[]> {
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
	return repos.map(convertGithubToRepo);
}

export async function create(repo: NewRepo, user: SessionUser): Promise<GitRepo> {
	const requestBody = {
		name: repo.name,
		description: repo.description,
		private: repo.private
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

	const data = (await response.json()) as GitHubRepo;

	return convertGithubToRepo(data);
}
