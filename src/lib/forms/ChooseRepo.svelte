<script lang="ts">
	import { SelectList, Option } from '$lib/comps'

	export let repos;

</script>

<SelectList name="repo">
	{#each repos as repo}
		<Option {value} />
	{/each}
</SelectList>