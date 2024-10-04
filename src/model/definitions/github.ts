export interface GitHubPlatformData {
	type: 'GitHub';
	id: number;
	username: string;
}

export interface GitHubUser {
	id: number;
	login: string;
	avatar_url: string;
	gravatar_id: string;
	url: string; // user profile url
	repos_url: string; // user repos url
	name: string;
	email: string;
	notification_email: string;
}
