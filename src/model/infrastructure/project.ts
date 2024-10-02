export const createProject = () => {
	return db.insert(projects).values([project]);
};

export const updateProject = () => {};

import db from '$db/init.server';
import { projects } from '$db/schema';
import { eq } from 'drizzle-orm';
import type { Project } from './definitions';

export const storeProject = async (project: Project) => {};

export const overwriteProject = async (project: Project) => {
	return db.update(projects).set(project).where(eq(projects.id, project.id));
};
