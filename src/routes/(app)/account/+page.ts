import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AccountServerData, UserServerData } from './definitions';

export const load: PageLoad = async ({ fetch, url }) => {
	const [accountResponse, userResponse] = await Promise.all([fetch(url), fetch('/account/user')]);

	if (accountResponse.ok && userResponse.ok) {
		const account = (await accountResponse.json()) as AccountServerData;
		const user = (await userResponse.json()) as UserServerData;

		return {
			user,
			account
		};
	}
	redirect(302, '/');
};
