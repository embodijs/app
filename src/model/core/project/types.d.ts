import * as schema from './schema';
import { InferOutput, InferInput } from 'valibot';
import { InferSelectModel } from 'drizzle-orm/sqlite-core';

export type ProjectId = TypeId<TYPEID.PROJECT>;
export type StoredProject = InferSelectModel<typeof schema.storage>;

export type Project = InferOutput<typeof schema.use>;
export type NewProject = InferInput<typeof schema.create>;
export type ProjectUpdate = InferInput<typeof schema.edit>;
