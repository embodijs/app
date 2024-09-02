import { redirect } from '@sveltejs/kit';

export function isAuthenticated(res: Response) {
	if (res.status === 401) {
		redirect(302, '/');
	}
}
