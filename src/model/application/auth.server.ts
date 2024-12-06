import type { GitHubUser } from '$core/git';
import type { StoredUser } from '$core/user';
import { insertUser, loadUserByPlatformId } from '$infra/auth/datasource.server';
import { generateId, TYPEID } from '$lib/typeid';

export const upsertUserByGithubId = async (gitHubUser: GitHubUser): Promise<StoredUser> => {
	const user = await loadUserByPlatformId(gitHubUser.id);
	if (user) {
		// TODO: Compare User and Update
		return user;
	}
	return await insertUser({
		id: generateId(TYPEID.USER),
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
