<script lang="ts">
	import type { PageData } from "./$types";
	import { ProjectList, EmptyTile } from "$lib/comps/project";

	//export let data: PageData;

	const addProject = () => {
		console.log("Add project");
	};
</script>

<main>
	<h2>Projects</h2>
	<ProjectList>
		<EmptyTile on:click={addProject}/>
	</ProjectList>
</main>