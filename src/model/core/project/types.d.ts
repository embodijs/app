import * as schema from './schema';
import { InferOutput, InferInput } from 'valibot';
import type { SetRequired } from 'type-fest';

export type ProjectId = TypeId<TYPEID.PROJECT>;
export type StoredProject = typeof schema.storage.$inferSelect;

export type Project = InferOutput<typeof schema.use>;
export type ProjectWithRepo = SetRequired<Project, 'repo'>;
export type NewProjectInput = InferInput<typeof schema.create>;
export type NewProject = InferOutput<typeof schema.create>;
export type ProjectUpdate = InferInput<typeof schema.edit>;
