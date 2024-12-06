import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { schema } from '$core/project';
import { createProject } from '$epp/project.server';
import { isAuthenticated } from '$lib/helpers/auth.server';
import { createSessionUser } from '$core/user';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		isAuthenticated(locals);
		const form = await superValidate(request, valibot(schema.create));

		if (!form.valid) {
			return fail(400, { form });
		}
		const sessionUser = createSessionUser(locals.user, locals.session!);
		await createProject(form.data, sessionUser);
		console.info('Project created successfully');
		return message(form, 'Project created successfully');
	}
};
