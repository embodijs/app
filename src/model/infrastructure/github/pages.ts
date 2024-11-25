import type { Project } from '$core/project';

export async function activatePages(project: Required<Pick<Project, 'repo' | 'path'>>) {
	const {
		repo: { name, owner, branch },
		path
	} = project;
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
