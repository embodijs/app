import { customId, metaAttributes } from '../utils/schema';
import type { GitHubPlatformData } from '../git';
import type { TYPEID } from '../../../lib/typeid';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const storage = sqliteTable('user', {
	id: customId<TYPEID.USER>('id').primaryKey(),
	platformId: text('platform_id').notNull(),
	platformData: text('platform_data', { mode: 'json' }).$type<GitHubPlatformData>().notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url'),
	...metaAttributes
});
