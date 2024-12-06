import type { TypeId, TYPEID } from '$lib/typeid';
import { customType, integer } from 'drizzle-orm/sqlite-core';

export const metaAttributes = {
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const customId = <T extends TYPEID>(name: string, notNull = true) =>
	customType<{ data: TypeId<T>; notNull: typeof notNull }>({
		dataType() {
			return 'text';
		}
	})(name);
