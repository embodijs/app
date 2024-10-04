export type APIData = [
	{
		id: number;
		name: string;
		full_name: string;
		default_branch: string;
		archived: boolean;
		disabled: boolean;
		has_pages: boolean;
		url: string;
		visibility: 'public' | 'private' | 'internal';
		update_at: string;
	}
];
