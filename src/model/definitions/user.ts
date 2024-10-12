import type { users } from '$db/schema';
import type { TYPEID, TypeId } from '$lib/typeid';
import type { InferSelectModel } from 'drizzle-orm';
import type { User } from 'lucia';

export type UserId = TypeId<TYPEID.USER>;
export type UserDatabase = InferSelectModel<typeof users>;
export type { User };
export type SessionUser = User & { accessToken: string };
