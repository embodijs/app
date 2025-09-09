import { customId } from '../utils/schema';
import { schema as userSchema } from '../user';
import { schema as projectSchema } from '../project';
import type { TYPEID } from '../../../lib/typeid';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const storage = sqliteTable('session', {
	id: customId<TYPEID.SESSION>('id').primaryKey(),
	userId: customId<TYPEID.USER>('user_id')
		.notNull()
		.references(() => userSchema.storage.id),
	activeProject: customId<TYPEID.PROJECT>('active_project').references(
		() => projectSchema.storage.id
	),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	accessToken: text('access_token').notNull()
});
