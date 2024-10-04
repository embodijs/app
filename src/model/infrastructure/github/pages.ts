async function activatePages(f: typeof fetch, project: Project) {
	const { repo, owner, branch, path } = project;
	const response = await f('/api/git/repos/pages', {
		method: 'POST',
		body: JSON.stringify({
			repo,
			owner,
			branch,
			path
		})
	});

	if (!response.ok) {
		throw new Error('Pages could not be activated');
	}
}
