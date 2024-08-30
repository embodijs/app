import { generateId, TYPEID } from '$lib/typeid';
import { loadUserByGithubId, insertUser } from './datasource.server';
import type { GitHubUser, UserDatabase } from './definitions';

export const upsertUserByGithubId = async (gitHubUser: GitHubUser): Promise<UserDatabase> => {
	const user = await loadUserByGithubId(gitHubUser.id);

	if (user) {
		// TODO: Compare User and Update
		return user;
	}

	return await insertUser({
		id: generateId(TYPEID.USER),
		githubId: gitHubUser.id,
		name: gitHubUser.name,
		email: gitHubUser.notification_email || gitHubUser.email,
		avatarUrl: gitHubUser.avatar_url
	});
};
