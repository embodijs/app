<script lang="ts">
	import { ProjectList } from '$molecules';
	import EmptyTile from '$molecules/project/EmptyTile.svelte';
	import { Card } from 'flowbite-svelte';

	const { projects, addHref } = $props();
</script>

<h2>Projects</h2>
<ProjectList>
	{#each projects as project}
		<Card href="projects/{project.id}">
			{project.name}
		</Card>
	{/each}
	<EmptyTile href={addHref} />
</ProjectList>
