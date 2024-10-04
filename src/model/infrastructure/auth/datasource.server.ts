import { db } from '$db/init.server';
import { users } from '$db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '$def/user';

export const insertUser = async (user: User) => {
	const savedUser = await db
		.insert(users)
		.values({
			...user,
			createdAt: Date.now(),
			updatedAt: Date.now()
		})
		.returning();
	return savedUser[0];
};

export const loadUserByPlatformId = async (id: number) => {
	return db.select().from(users).where(eq(users.platformId, id.toString())).get();
};
