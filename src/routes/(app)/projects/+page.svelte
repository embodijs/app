<script lang="ts">
	import type { PageData } from "./$types";
	import { ProjectList, EmptyTile } from "$lib/comps/project";
	import { goto } from "$app/navigation";

	//export let data: PageData;

	const addProject = () => {
		goto("/projects/create");
	};
</script>

<main>
	<h2>Projects</h2>
	<ProjectList>
		<EmptyTile on:click={addProject}/>
	</ProjectList>
</main>