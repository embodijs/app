import type { GitHubUser } from '$def/github';
import type { UserDatabase } from '$def/user';
import { insertUser, loadUserByPlatformId } from '$infra/auth/datasource.server';
import { generateId, TYPEID } from '$lib/typeid';

export const upsertUserByGithubId = async (gitHubUser: GitHubUser): Promise<UserDatabase> => {
	const user = await loadUserByPlatformId(gitHubUser.id);

	if (user) {
		// TODO: Compare User and Update
		return user;
	}

	return await insertUser({
		id: generateId(TYPEID.USER),
		platformId: gitHubUser.id.toString(),
		platformData: {
			type: 'GitHub',
			id: gitHubUser.id,
			username: gitHubUser.login
		},
		name: gitHubUser.name,
		email: gitHubUser.notification_email || gitHubUser.email,
		avatarUrl: gitHubUser.avatar_url
	});
};
