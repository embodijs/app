<script lang="ts">
	import type { PageData } from './$types';
	import { ProjectOverview } from '$templates';

	const { data }: { data: PageData } = $props();
</script>

<main>
	<ProjectOverview addHref="/projects/create" projects={data.projects} />
</main>
