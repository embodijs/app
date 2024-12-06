<script lang="ts">
	import type { NewRepo, Repo } from '$core/repo';
	import {
		Label,
		Select,
		TabItem,
		Tabs,
		type SelectOptionType,
		Input,
		Textarea,
		Checkbox,
		Helper
	} from 'flowbite-svelte';
	import { writable, type Unsubscriber } from 'svelte/store';
	import type { GitRepo } from '$core/git';

	type Props = {
		onupdate: (repo: NewRepo | Repo) => void;
		repos: GitRepo[];
	};

	const INPUT_IDS = {
		REPO_SELECT: 'select-repo-1',
		REPO_NAME: 'input-repo-name-1',
		REPO_DESCRIPTION: 'textarea-description-1'
	};

	const { onupdate, repos }: Props = $props();

	let subscription: Unsubscriber | null = $state(null);
	const unsubscripe = () => {
		if (subscription) {
			subscription();
		}
	};

	const newRepo = writable<NewRepo>({
		name: '',
		description: '',
		owner: '',
		branch: 'main',
		private: false,
		hasPages: true
	});

	const existingRepo = writable<Repo>({
		id: '' as Repo['id'],
		name: '',
		owner: '',
		description: '',
		branch: 'main',
		private: false,
		hasPages: true
	});

	const subscribeToChoose = () => {
		unsubscripe();
		subscription = existingRepo.subscribe((value) => {
			onupdate(value);
		});
	};

	const chooseRepo = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		const repo = repos.find((repo) => repo.id === target.value);
		if (repo) {
			existingRepo.set({
				id: repo.id,
				name: repo.name,
				owner: repo.owner,
				description: repo.description,
				branch: 'main',
				private: repo.private,
				hasPages: true
			});
		}
	};
	const subscribeToCreate = () => {
		unsubscripe();
		subscription = newRepo.subscribe((value) => {
			onupdate(value);
		});
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

<Tabs tabStyle="underline">
	<TabItem onclick={subscribeToChoose}>
		<div slot="title">
			<i class="ri-git-commit-line"></i> Choose extisting Project
		</div>
		<div>
			<Label for={INPUT_IDS.REPO_SELECT}>Select an existing Project</Label>
			<Select
				id={INPUT_IDS.REPO_SELECT}
				items={convertRepoToSelectItems(repos)}
				on:input={chooseRepo}
				bind:value={$existingRepo.id}
			/>
		</div>
	</TabItem>
	<TabItem open onclick={subscribeToCreate}>
		<div slot="title">
			<i class="ri-add-line"></i>
			Create a new Project
		</div>
		<div class="grid gap-4">
			<div>
				<Label for={INPUT_IDS.REPO_NAME}>Name of the Project in GitHub</Label>
				<Input name="repoName" id={INPUT_IDS.REPO_NAME} bind:value={$newRepo.name} />
			</div>
			<div>
				<Label for={INPUT_IDS.REPO_DESCRIPTION}>Description for Git (optional)</Label>
				<Textarea
					name="repoDescription"
					id={INPUT_IDS.REPO_DESCRIPTION}
					placeholder="Description will be send to GitHub"
					bind:value={$newRepo.description}
				/>
			</div>
			<div>
				<Checkbox checked={$newRepo.private}>Private</Checkbox>
				<Helper>Should the repository be private?</Helper>
			</div>
		</div>
	</TabItem>
</Tabs>
