export interface GitRepo {
	id: string;
	name: string;
	fullName: string;
	owner: string;
	ownerId: string;
	private: boolean;
	description: string;
	defaultBranch: string;
	activePage: boolean;
}
