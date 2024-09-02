<script lang="ts">
	import { SelectList, Option } from '$lib/comps'
	import Button from '../input/Button.svelte';
	type RepoProp = { full_name: string, id: string }[];


	export let repos: RepoProp = [];

</script>

<SelectList name="repo">
	{#each repos as repo}
		<Option value={repo.id}>
			{repo.full_name}
		</Option>
	{/each}
</SelectList>
<Button type="ghost">
	<i class="ri-add-fill"></i>
	create new repo
</Button>
<Button type="primary">
	<i class="ri-git-repository-fill"></i>
	create
</Button>