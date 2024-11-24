import type * as schema from './schema';
import type { InferSelectModel } from 'drizzle-orm';
import type { TypeId, TYPEID } from '$lib/typeid';
import type { SessionValidationResult } from '$infra/auth/lucia.server';

type Session = NonNullable<SessionValidationResult['session']>;

export type SessionId = TypeId<TYPEID.SESSION>;
export type { Session };
export type StoredSession = InferSelectModel<typeof schema.session>;
