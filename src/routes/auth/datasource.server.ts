import { db } from '$db/init.server';
import { users } from '$db/schema';
import { eq } from 'drizzle-orm';
import type { UserId } from './definitions';

export const insertUser = async (user: { id: UserId; username: string; githubId?: number }) => {
	const savedUser = await db.insert(users).values(user).returning();
	return savedUser[0];
};

export const loadUserByGithubId = async (id: number) => {
	return await db.select().from(users).where(eq(users.githubId, id)).get();
};
