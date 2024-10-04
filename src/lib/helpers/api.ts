import { redirect } from '@sveltejs/kit';

export function isAuthenticated(res: Response, url: URL) {
	if (res.status === 401) {
		const redirectUrl = new URL('/auth', url.origin);
		redirectUrl.searchParams.set('redirect', url.pathname);

		return redirect(302, redirectUrl);
	}
}
