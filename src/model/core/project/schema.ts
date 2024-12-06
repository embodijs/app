import { metaAttributes, customId } from '../utils/schema';
import { TYPEID, valibotTypeId } from '../../../lib/typeid';

import * as v from 'valibot';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { schema as repoSchema } from '../repo';

export const valibotId = valibotTypeId(TYPEID.PROJECT);

export const storage = sqliteTable('project', {
	id: customId<TYPEID.PROJECT>('id').primaryKey(),
	repoId: customId<TYPEID.GITHUB | TYPEID.GITLAB>('repo_id')
		.notNull()
		.references(() => repoSchema.storage.id),
	name: text('name').notNull(),
	url: text('url').notNull(),
	path: text('path').notNull().default('/'),
	description: text('description'),
	...metaAttributes
});

export const use = v.object({
	id: valibotId,
	repoId: repoSchema.valibotId,
	name: v.pipe(v.string(), v.minLength(1)),
	url: v.pipe(v.string(), v.url()),
	path: v.string(),
	description: v.optional(v.string())
});

export const create = v.object({
	...v.omit(use, ['id', 'repoId']).entries,
	repo: v.union([repoSchema.use, repoSchema.create])
});

export const edit = {
	...use
};
