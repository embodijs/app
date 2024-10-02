import type { SomeRecord } from "$lib/helpers/type";
import { generateId, TYPEID } from "$lib/typeid";
import type { NewProject, Project } from "$def/project";



function isNewProject(project: SomeRecord): project is NewProject {
	return !project.id;
}

function hasExistingRepository(
	project: NewProject
): project is NewProject & Required<Pick<NewProject, 'repoId'>> {
	return 'repoId' in project;
}

function createProjectFromNewProject(
	project: NewProject & Required<Pick<NewProject, 'repoId'>>
): Project {
	const id = generateId(TYPEID.PROJECT);
	return {
		...project,
		id
	};
}

async function activatePages(f: typeof fetch, project: Project) {
	const { repo, owner, branch, path } = project;
	const response = await f('/api/git/repos/pages', {
		method: 'POST',
		body: JSON.stringify({
			repo,
			owner,
			branch,
			path
		})
	});

	if (!response.ok) {
		throw new Error('Pages could not be activated');
	}
}

async function createRepository(f: typeof fetch, project: NewProject): Promise<{ id: string }> {
	const response = await f(`/api/git/repos`, {
		method: 'POST',
		body: JSON.stringify({
			name: project.repoName,
			description: project.repoDescription,
			private: project.repoPrivate
		})
	});

	if (!response.ok) {
		throw new Error('Failed to create repository');
	}

	const { id } = await response.json();
	return { id: id.toString() };
}

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, valibot(createSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (isNewProject(form.data)) {
			const { data: newProject } = form;


		}

		return message(form, 'Project created successfully');
	}
};

export const createProject = (newProject: ) => {

  if (hasExistingRepository(newProject)) {
    const project = createProjectFromNewProject(newProject);
    storeProject(project);
  } else {
    const { id } = await createRepository(fetch, newProject);
    const project = createProjectFromNewProject({ ...newProject, repoId: id });
    storeProject(project);
  }
}
