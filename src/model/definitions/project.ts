import { TYPEID, valibotTypeId, type TypeId } from '$lib/typeid';
import * as v from 'valibot';

export const schema = v.object({
	id: valibotTypeId(TYPEID.PROJECT),
	repoId: v.pipe(v.string(), v.minLength(1)),
	name: v.pipe(v.string(), v.minLength(1)),
	url: v.pipe(v.string(), v.url()),
	branch: v.pipe(v.string(), v.minLength(1)),
	path: v.string(),
	owner: v.string(),
	repo: v.string()
});

export const createSchema = v.object({
	...v.omit(schema, ['id']).entries,
	repoName: v.pipe(v.string(), v.minLength(3)),
	repoDescription: v.optional(v.string()),
	repoPrivate: v.optional(v.boolean()),
	repoId: v.optional(schema.entries.repoId),
	hasPages: v.boolean()
});

export const editSchema = schema;

export type Project = v.InferOutput<typeof schema>;
export type NewProject = v.InferInput<typeof createSchema>;
export type ProjectUpdate = v.InferInput<typeof editSchema>;

// TODO: Currently (2021-10-06) the following code is not working drizzle-valibot seem to work only with valibot < 0.31.0
// https://github.com/drizzle-team/drizzle-orm/issues/2521
//createInsertSchema<InferInsertModel<typeof projects>>(projects);
