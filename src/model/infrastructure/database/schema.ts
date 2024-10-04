import type { GitHubPlatformData } from '$def/github';
import { TYPEID, type TypeId } from '$lib/typeid';
import { text, integer, sqliteTable, customType } from 'drizzle-orm/sqlite-core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customId = <T extends TYPEID>(name: string, notNull = true) =>
	customType<{ data: TypeId<T>; notNull: typeof notNull }>({
		dataType() {
			return 'text';
		}
	})(name);

const metaAttributes = {
	createdAt: integer('created_at').notNull(),
	updatedAt: integer('updated_at').notNull()
};

export const users = sqliteTable('users', {
	id: customId<TYPEID.USER>('id').primaryKey(),
	platformId: text('platform_id').notNull(),
	platformData: text('platform_data', { mode: 'json' }).$type<GitHubPlatformData>().notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url'),
	...metaAttributes
});

export const sessions = sqliteTable('sessions', {
	id: customId<TYPEID.SESSION>('id').primaryKey(),
	userId: customId<TYPEID.USER>('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
	accessToken: text('access_token').notNull()
});

export const projects = sqliteTable('projects', {
	id: customId<TYPEID.PROJECT>('id').primaryKey(),
	repoId: text('ref_id').notNull(),
	owner: text('owner').notNull(),
	repo: text('repo').notNull(),
	name: text('name').notNull(),
	url: text('url').notNull(),
	branch: text('branch').notNull().default('main'),
	path: text('path').notNull().default('/'),
	...metaAttributes
});
