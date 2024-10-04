import type { NewProject } from '$def/project';

export async function loadRepositories(accessToken: string) {
	return fetch('https://api.github.com/user/repos', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
}

export async function createRepository(
	project: NewProject,
	accessToken: string
): Promise<{ id: string }> {
	const requestBody = {
		name: project.repoName,
		description: project.repoDescription,
		private: project.repoPrivate
	};

	const response = await fetch('https://api.github.com/user/repos', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
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
