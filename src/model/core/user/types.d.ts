import type * as schema from './schema';
import type { TYPEID, TypeId } from '$lib/typeid';
import type { InferSelectModel } from 'drizzle-orm';
import type { SessionValidationResult } from '$infra/auth/lucia.server';

type User = NonNullable<SessionValidationResult['user']>;

export type UserId = TypeId<TYPEID.USER>;
export type { User };
export type SessionUser = User & { accessToken: string };

export type StoredUser = InferSelectModel<typeof schema.user>;
