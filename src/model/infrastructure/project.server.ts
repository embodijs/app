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

export const all = () => {
	return db
		.select({
			id: schema.storage.id,
			name: schema.storage.name,
			createdAt: schema.storage.createdAt,
			updatedAt: schema.storage.updatedAt
		})
		.from(schema.storage)
		.all();
};
