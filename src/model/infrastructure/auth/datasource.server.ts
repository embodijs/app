import { db } from '$db/init.server';
import * as table from '$db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '$def/user';

export const insertUser = async (user: User) => {
	const now = new Date();
	const savedUser = await db
		.insert(table.user)
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
	return db.select().from(table.user).where(eq(table.user.platformId, id.toString())).get();
};
