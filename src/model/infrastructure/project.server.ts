import db from '$db/init.server';
import * as table from '$db/schema';
import { eq } from 'drizzle-orm';
import type { Project } from '$def/project';

export const createProject = (project: Project, when: Date = new Date()) => {
	const timestampe = when.getTime();
	return db.insert(table.project).values([
		{
			...project,
			createdAt: timestampe,
			updatedAt: timestampe
		}
	]);
};

export const updateProject = (project: Project, when: Date = new Date()) => {
	const timestamp = when.getDate();
	return db
		.update(table.project)
		.set({
			...project,
			updatedAt: timestamp
		})
		.where(eq(table.project.id, project.id));
};
