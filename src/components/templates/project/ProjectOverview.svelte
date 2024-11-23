<script lang="ts">
	import { ProjectList, EmptyTile } from '$molecules';

	const { onadd } = $props();
</script>

<h2>Projects</h2>
<ProjectList>
	<EmptyTile onclick={onadd} />
</ProjectList>
