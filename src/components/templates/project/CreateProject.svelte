<script lang="ts">
	import type { GitRepo } from '$core/git';
	import { schema, type NewProject } from '$core/project';
	import { Textarea, Label, Input, Button } from 'flowbite-svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { Section } from '$components';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { getNotificationStore } from '$lib/contexts/notifications';
	import RepoFormPart from '$components/organisms/RepoFormPart.svelte';
	import type { NewRepo, Repo } from '$core/repo';

	type Props = {
		form: SuperValidated<NewProject>;
		repos: GitRepo[];
	};

	const notifications = getNotificationStore();

	const { form: validateForm, repos }: Props = $props();
	const { form, enhance, allErrors } = superForm(validateForm, {
		dataType: 'json',
		validators: valibot(schema.create)
	});

	$effect(() => {
		return allErrors.subscribe((errors) => {
			if (errors?.length) {
				errors.forEach((error) => {
					notifications.error(`Field ${error.path} ${error.messages.join(', ')}`);
				});
			}
		});
	});

	const setRepo = (repo: Repo | NewRepo) => {
		$form.repo = repo;
	};

	const INPUT_IDS = {
		PROJECT_NAME: 'input-project-name-1',
		PROJECT_URL: 'input-project-url-1',
		PROJECT_DESCRIPTION: 'textarea-project-description-1'
	};
</script>

<Section>
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a new Project</h2>
	<form method="POST" use:enhance class="grid gap-4">
		<div>
			<RepoFormPart {repos} onupdate={setRepo} />
		</div>
		<div>
			<Label for={INPUT_IDS.PROJECT_NAME}>Name</Label>
			<Input id={INPUT_IDS.PROJECT_NAME} name="name" bind:value={$form.name} />
		</div>
		<div>
			<Label for={INPUT_IDS.PROJECT_URL}>URL</Label>
			<Input id={INPUT_IDS.PROJECT_URL} name="url" bind:value={$form.url} />
		</div>
		<div>
			<Label for={INPUT_IDS.PROJECT_DESCRIPTION}>Description (optional)</Label>
			<Textarea
				name="repoDescription"
				id={INPUT_IDS.PROJECT_DESCRIPTION}
				placeholder="Description will be send to GitHub"
				bind:value={$form.description}
			/>
		</div>

		<Button type="submit" class="w-32">Save Project</Button>
	</form>
</Section>
