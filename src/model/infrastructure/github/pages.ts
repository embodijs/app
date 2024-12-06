import type { Project } from '$core/project';
import type { Repo } from '$core/repo';
import type { SessionUser } from '$core/user';

export async function activatePages(project: Project, repo: Repo, user: SessionUser) {
	const { path } = project;
	const { name, owner, branch } = repo;
	console.log(`Activating pages for ${owner}/${name} at ${path} on branch ${branch}`);
	const response = await fetch(`https://api.github.com/repos/${owner}/${name}/pages`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${user.accessToken}`
		},
		body: JSON.stringify({
			build_type: 'workflow',
			source: {
				branch: branch,
				path
			}
		})
	});

	if (!response.ok) {
		console.error(response);
		console.error(await response.text());
		throw new Error('Pages could not be activated');
	}

	return response;
}
