import type { GitHubPlatformData } from '$core/git';

export interface AccountServerData {
	platformData: GitHubPlatformData;
	name: string;
	avatar?: string;
}
