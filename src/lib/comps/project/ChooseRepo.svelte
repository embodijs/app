<script lang="ts">
	import type { GitRepo } from '$def/git';
	import { SelectList, Option } from '$lib/comps';
	import { getMultistageContext } from '../form/multistageContext';
	import Button from '../input/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let repos: GitRepo[] = [];
	export let selected: string | undefined = undefined;

	const { progress } = getMultistageContext();
	const dispatch = createEventDispatcher<{ new: undefined; select: GitRepo }>();

	const handleRepoSelect = (
		event: CustomEvent<{ value: string | number; name: string; type: 'radio' }>
	) => {
		selected = event.detail.value as string;
	};

	const handleChoice = () => {
		if (selected) {
			const repo = repos.find((repo) => repo.id === selected);
			if (repo) {
				dispatch('select', repo);
			}
			progress.set(50);
		}
	};

	const handleCreateNewRepo = () => {
		dispatch('new', undefined);
		progress.set(20);
	};
</script>

<div class="formpart">
	<SelectList {selected} name="repo">
		{#each repos as repo}
			<Option value={repo.id} on:select={handleRepoSelect}>
				{repo.fullName}
			</Option>
		{/each}
	</SelectList>
	<div class="actions">
		<Button type="ghost" on:click={handleCreateNewRepo}>
			<i class="ri-add-fill"></i>
			create new repo
		</Button>
		<Button type="primary" disabled={!selected} on:click={handleChoice}>
			<i class="ri-git-repository-fill"></i>
			next
		</Button>
	</div>
</div>

<style lang="postcss">
	.actions {
		display: flex;
		justify-content: space-between;
	}

	div.formpart {
		@apply mx-4;
	}
</style>
