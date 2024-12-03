import * as schema from './schema';
import { InferOutput, InferInput } from 'valibot';
import { InferSelectModel } from 'drizzle-orm/sqlite-core';
import type { TYPEID } from '$lib/typeid';

export type RepoId = TypeId<TYPEID.GITHUB | TYPEID.GITLAB>;
export type StoredRepo = InferSelectModel<typeof schema.storage>;

export type Repo = InferOutput<typeof schema.use>;
export type NewRepoInput = InferInput<typeof schema.create>;
export type NewRepo = InferOutput<typeof schema.create>;
export type UpdateRepo = InferInput<typeof schema.edit>;
