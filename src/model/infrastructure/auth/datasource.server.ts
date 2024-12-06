import { db } from '$db/init.server';
import { schema } from '$core/user';
import { eq } from 'drizzle-orm';
import type { User } from '$core/user';

export const insertUser = async (user: User) => {
	const now = new Date();
	const savedUser = await db
		.insert(schema.storage)
		.values({
			platformId: user.platformData.id.toString(),
			...user,
			createdAt: now,
			updatedAt: now
		})
		.returning();
	return savedUser[0];
};

export const loadUserByPlatformId = async (id: number) => {
	return db.select().from(schema.storage).where(eq(schema.storage.platformId, id.toString())).get();
};
