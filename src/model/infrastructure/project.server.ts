import db from '$db/init.server';
import { schema, type Project } from '$core/project';
import { eq } from 'drizzle-orm';

export const store = (project: Project, when: Date = new Date()) => {
	const result = db
		.insert(schema.storage)
		.values([
			{
				...project,
				createdAt: when,
				updatedAt: when
			}
		])
		.execute();
	return result;
};

export const update = (project: Project, when: Date = new Date()) => {
	return db
		.update(schema.storage)
		.set({
			...project,
			updatedAt: when
		})
		.where(eq(schema.storage.id, project.id));
};
