import db from '$db/init.server';
import { projects } from '$db/schema';
import { eq } from 'drizzle-orm';
import type { Project } from '$def/project';

export const createProject = (project: Project, when: Date = new Date()) => {
	const timestampe = when.getTime();
	return db.insert(projects).values([
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
		.update(projects)
		.set({
			...project,
			updatedAt: timestamp
		})
		.where(eq(projects.id, project.id));
};
