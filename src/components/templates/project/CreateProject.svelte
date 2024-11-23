<script lang="ts">
	import type { GitRepo } from '$def/git';
	import { createSchema, type NewProject } from '$def/project';
	import {
		Tabs,
		TabItem,
		Textarea,
		Label,
		Input,
		Select,
		Button,
		type SelectOptionType,
		Checkbox,
		Helper
	} from 'flowbite-svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { Section } from '$components';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { getNotificationStore } from '$lib/contexts/notifications';

	type Props = {
		form: SuperValidated<NewProject>;
		repos: GitRepo[];
	};

	const notifications = getNotificationStore();

	const { form: validateForm, repos }: Props = $props();
	const { form, enhance, allErrors } = superForm(validateForm, {
		dataType: 'json',
		validators: valibot(createSchema)
	});

	$effect(() => {
		return allErrors.subscribe((errors) => {
			console.log(errors);
			if (errors?.length) {
				errors.forEach((error) => {
					notifications.error(`Field ${error.path} ${error.messages.join(', ')}`);
				});
			}
		});
	});

	const INPUT_IDS = {
		REPO_SELECT: 'select-repo-1',
		REPO_NAME: 'input-repo-name-1',
		REPO_DESCRIPTION: 'textarea-description-1',
		PROJECT_NAME: 'input-project-name-1',
		PROJECT_URL: 'input-project-url-1',
		PROJECT_DESCRIPTION: 'textarea-project-description-1'
	};

	const convertRepoToSelectItems = (repos: GitRepo[]): SelectOptionType<string>[] => {
		return repos.map((repo) => {
			return {
				value: repo.id,
				name: repo.fullName
			};
		});
	};
</script>

<Section>
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a new Project</h2>
	<form method="POST" use:enhance class="grid gap-4">
		<div>
			<Tabs tabStyle="underline">
				<TabItem open>
					<div slot="title">
						<i class="ri-git-commit-line"></i> Choose extisting Project
					</div>
					<div>
						<Label for={INPUT_IDS.REPO_SELECT}>Select an existing Project</Label>
						<Select
							id={INPUT_IDS.REPO_SELECT}
							items={convertRepoToSelectItems(repos)}
							bind:value={$form.repo.id}
						/>
					</div>
				</TabItem>
				<TabItem open>
					<div slot="title">
						<i class="ri-add-line"></i>
						Create a new Project
					</div>
					<div class="grid gap-4">
						<div>
							<Label for={INPUT_IDS.REPO_NAME}>Name of the Project in GitHub</Label>
							<Input name="repoName" id={INPUT_IDS.REPO_NAME} bind:value={$form.repo.name} />
						</div>
						<div>
							<Label for={INPUT_IDS.REPO_DESCRIPTION}>Description for Git (optional)</Label>
							<Textarea
								name="repoDescription"
								id={INPUT_IDS.REPO_DESCRIPTION}
								placeholder="Description will be send to GitHub"
							/>
						</div>
						<div>
							<Checkbox checked={$form.repo.private}>Private</Checkbox>
							<Helper>Should the repository be private?</Helper>
						</div>
					</div>
				</TabItem>
			</Tabs>
		</div>
		<div>
			<Label for={INPUT_IDS.PROJECT_NAME}>Project name</Label>
			<Input id={INPUT_IDS.PROJECT_NAME} name="name" />
		</div>
		<div>
			<Label for={INPUT_IDS.PROJECT_URL}>Project name</Label>
			<Input id={INPUT_IDS.PROJECT_URL} name="url" />
		</div>
		<div>
			<Label for={INPUT_IDS.PROJECT_DESCRIPTION}>Project description (optional)</Label>
			<Textarea
				name="repoDescription"
				id={INPUT_IDS.PROJECT_DESCRIPTION}
				placeholder="Description will be send to GitHub"
			/>
		</div>

		<Button type="submit" class="w-32">Save Project</Button>
	</form>
</Section>
