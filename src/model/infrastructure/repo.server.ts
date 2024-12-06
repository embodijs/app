import db from '$db/init.server';
import { schema, type Repo } from '$core/repo';
import { eq } from 'drizzle-orm';

export const store = (repo: Repo, when: Date = new Date()) => {
	const result = db
		.insert(schema.storage)
		.values([
			{
				...repo,
				createdAt: when,
				updatedAt: when
			}
		])
		.execute();
	return result;
};

export const update = (repo: Repo, when: Date = new Date()) => {
	return db
		.update(schema.storage)
		.set({
			...repo,
			updatedAt: when
		})
		.where(eq(schema.storage.id, repo.id));
};
