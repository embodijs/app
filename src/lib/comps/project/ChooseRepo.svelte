<script lang="ts">
	import { SelectList, Option } from '$lib/comps'
	import Button from '../input/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	type RepoProp = { full_name: string, name: string, id: number };
	export let repos: RepoProp[] = [];

	const dispatch = createEventDispatcher<{new: {}, select: RepoProp}>();

	let selectedRepo: RepoProp | undefined;
	const handleRepoSelect = (event: CustomEvent<{value: string | number, name: string, type: "radio"}>) => {
		selectedRepo = repos.find(repo => repo.id === event.detail.value);
	}

	const handleChoice = () => {
		if(selectedRepo) {
			dispatch('select', selectedRepo);
		}
	}

	const handleCreateNewRepo = () => {
		dispatch('new', {});
	}

</script>

<div class="formpart">
	<SelectList name="repo">
		{#each repos as repo}
			<Option value={repo.id} on:select={handleRepoSelect}>
				{repo.full_name}
			</Option>
		{/each}
	</SelectList>
	<div class="actions">
		<Button type="ghost" on:click={handleCreateNewRepo}>
			<i class="ri-add-fill"></i>
			create new repo
		</Button>
		<Button type="primary" disabled={!selectedRepo} on:click={handleChoice}>
			<i class="ri-git-repository-fill"></i>
			select
		</Button>
	</div>
</div>


<style lang="postcss">
	.actions {
		display: flex;
		justify-content: space-between;
	}

	div.formpart{
		@apply mx-4;
	}
</style>