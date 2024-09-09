import type { users } from '$db/schema';
import type { TYPEID, TypeId } from '$lib/typeid';
import type { InferSelectModel } from 'drizzle-orm';

export type UserId = TypeId<TYPEID.USER>;
export type UserDatabase = InferSelectModel<typeof users>;
export type User = Omit<UserDatabase, 'createdAt' | 'updatedAt'>;

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
