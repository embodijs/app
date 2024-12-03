import type { Project } from '$core/project';
import type { Repo } from '$core/repo';

export async function activatePages(project: Project, repo: Repo) {
	const { path } = project;
	const { name, owner, branch } = repo;
	const response = await fetch(`https://api.github.com/${owner}/${name}/pages`, {
		method: 'POST',
		body: JSON.stringify({
			build_type: 'workflow',
			source: {
				branch: branch,
				path
			}
		})
	});

	if (!response.ok) {
		throw new Error('Pages could not be activated');
	}

	return response;
}
