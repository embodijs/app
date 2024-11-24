import { TYPEID, valibotTypeId } from '$lib/typeid.js';
import { metaAttributes, customId } from '../utils/schema';
import * as v from 'valibot';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const storage = sqliteTable('project', {
	id: customId<TYPEID.PROJECT>('id').primaryKey(),
	repoId: text('ref_id').notNull(),
	owner: text('owner').notNull(),
	repo: text('repo').notNull(),
	name: text('name').notNull(),
	url: text('url').notNull(),
	activePage: integer('active_pages', { mode: 'boolean' }).notNull(),
	branch: text('branch').notNull().default('main'),
	path: text('path').notNull().default('/'),
	description: text('description'),
	...metaAttributes
});

export const use = v.object({
	id: valibotTypeId(TYPEID.PROJECT),
	repoId: v.pipe(v.string(), v.minLength(1)),
	owner: v.string(),
	repo: v.string(),
	name: v.pipe(v.string(), v.minLength(1)),
	url: v.pipe(v.string(), v.url()),
	activePage: v.optional(v.boolean(), false),
	branch: v.pipe(v.string(), v.minLength(1)),
	path: v.string(),
	description: v.optional(v.string())
});

export const create = v.object({
	...v.omit(use, ['id']).entries,
	repo: v.pipe(v.string(), v.minLength(3)),
	repoDescription: v.optional(v.string()),
	repoPrivate: v.optional(v.boolean()),
	repoId: v.optional(use.entries.repoId)
});

export const edit = use;
