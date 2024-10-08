import { TYPEID, type TypeId } from '$lib/typeid';
import { text, integer, sqliteTable, customType } from 'drizzle-orm/sqlite-core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customId = <T extends TYPEID>(name: string, notNull = true) =>
	customType<{ data: TypeId<T>; notNull: typeof notNull }>({
		dataType() {
			return 'text';
		}
	})(name);

export const users = sqliteTable('users', {
	id: customId<TYPEID.USER>('id').primaryKey(),
	githubId: integer('github_id').unique(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url')
});

export const sessions = sqliteTable('sessions', {
	id: customId<TYPEID.SESSION>('id').primaryKey(),
	userId: customId<TYPEID.USER>('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
	accessToken: text('access_token').notNull()
});
