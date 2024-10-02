export const createProject = (project: Project) => {
	return db.insert(projects).values([project]);
};

export const updateProject = () => {
	return db.update(projects).set(project).where(eq(projects.id, project.id));
};

import db from '$db/init.server';
import { projects } from '$db/schema';
import { eq } from 'drizzle-orm';
import type { Project } from '$def/project';

export const storeProject = async (project: Project) => {};

export const overwriteProject = async (project: Project) => {};
