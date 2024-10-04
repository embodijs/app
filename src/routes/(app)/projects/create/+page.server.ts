import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { createSchema } from '$def/project';
import { createProject } from '$epp/project.server';
import { isAuthenticated } from '$infra/auth/auth.server';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		isAuthenticated(locals);
		const form = await superValidate(request, valibot(createSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		createProject(form.data, { accessTocken: locals.session.accessToken });

		return message(form, 'Project created successfully');
	}
};
