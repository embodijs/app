import { TYPEID, valibotTypeId } from '$lib/typeid.js';
import { metaAttributes, customId } from '../utils/schema';
import * as v from 'valibot';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const storage = sqliteTable('project', {
	id: customId<TYPEID.GITHUB | TYPEID.GITLAB>('id').primaryKey(),
	owner: text('owner').notNull(),
	name: text('name').notNull(),
	hasPages: integer('has_pages', { mode: 'boolean' }).notNull(),
	branch: text('branch').notNull().default('main'),
	description: text('description'),
	...metaAttributes
});

export const use = v.object({
	id: valibotTypeId(TYPEID.GITHUB, TYPEID.GITLAB),
	owner: v.string(),
	name: v.pipe(v.string(), v.minLength(1)),
	hasPages: v.optional(v.boolean(), false),
	branch: v.pipe(v.string(), v.minLength(1)),
	private: v.optional(v.boolean()),
	description: v.optional(v.string())
});

export const create = v.object({
	...v.omit(use, ['id']).entries,
	private: v.optional(v.boolean(), false)
});

export const edit = use;

export const valibotId = valibotTypeId(TYPEID.GITHUB, TYPEID.GITLAB);
