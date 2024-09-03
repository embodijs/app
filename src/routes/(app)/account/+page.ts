import type { PageLoad } from './$types';
import type { AccountServerData, UserServerData } from './definitions';
import { isAuthenticated } from '$lib/helpers/api';

export const load: PageLoad = async ({ fetch, url }) => {
	const [accountResponse, userResponse] = await Promise.all([fetch(url), fetch('/account/user')]);
	isAuthenticated(accountResponse);

	const account = (await accountResponse.json()) as AccountServerData;
	const user = (await userResponse.json()) as UserServerData;

	return {
		user,
		account
	};
};
