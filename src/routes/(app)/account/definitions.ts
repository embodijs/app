import type { GitHubPlatformData } from '$def/github';

export interface AccountServerData {
	platformData: GitHubPlatformData;
	name: string;
	avatar?: string;
}
