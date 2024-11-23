<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { ProjectOverview } from '$templates';

	const { data }: { data: PageData } = $props();

	const addProject = () => {
		goto('/projects/create');
	};
</script>

<main>
	<ProjectOverview onadd={addProject} />
</main>
