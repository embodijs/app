<script lang="ts">
	import { ProjectList } from '$molecules';
	import MainFrame from '$organisms/MainFrame.svelte';
	import { Card } from 'flowbite-svelte';

	const { projects, addHref } = $props();
</script>

<MainFrame headline="Project" add={{ name: 'Project', href: addHref }}>
	<ProjectList>
		{#each projects as project}
			<Card href="projects/{project.id}">
				{project.name}
			</Card>
		{/each}
	</ProjectList>
</MainFrame>
