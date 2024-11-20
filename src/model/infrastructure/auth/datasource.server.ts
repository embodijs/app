import { db } from '$db/init.server';
import * as table from '$db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '$def/user';

export const insertUser = async (user: User) => {
	const savedUser = await db
		.insert(table.user)
		.values({
			...user,
			createdAt: Date.now(),
			updatedAt: Date.now()
		})
		.returning();
	return savedUser[0];
};

export const loadUserByPlatformId = async (id: number) => {
	return db.select().from(table.user).where(eq(table.user.platformId, id.toString())).get();
};
