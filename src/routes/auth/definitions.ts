import type { users } from '$db/schema';
import type { TYPEID, TypeId } from '$lib/typeid';
import type { InferSelectModel } from 'drizzle-orm';

export type UserId = TypeId<TYPEID.USER>;
export type UserDatabase = InferSelectModel<typeof users>;

export interface GitHubUser {
	id: number;
	login: string;
}
