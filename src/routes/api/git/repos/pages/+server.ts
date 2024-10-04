import { isAuthenticated } from '$infra/auth/auth.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {};

export const POST: RequestHandler = async ({ fetch, locals, request }) => {
	isAuthenticated(locals);
	const data = await request.json();
	const response = fetch(`https://api.github.com/${data.owner}/${data.repo}/pages`, {
		method: 'POST',
		body: JSON.stringify({
			build_type: 'workflow',
			source: {
				branch: data.branch,
				path: '/'
			}
		})
	});
	return response;
};
