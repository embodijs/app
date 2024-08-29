import { db } from '$db/init.server';
import { users } from '$db/schema';
import { eq } from 'drizzle-orm';
import type { UserId } from './definitions';

export const writeUser = async (user: { id: UserId; username: string; githubId?: number }) => {
	await db.insert(users).values(user).execute();
	return user.id;
};

export const readUserByGithubId = async (id: number) => {
	return await db.select().from(users).where(eq(users.githubId, id)).get();
};
