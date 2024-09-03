<script lang="ts">
	import { enhance } from "$app/forms";
	import { ChooseRepo } from "$lib/comps/project";
	import type { PageData } from "./$types";

	export let data: PageData;

	const handleCreateNew = () => {
		console.log("create new repo");
	}

	const handleFromRepo = (event: CustomEvent< {full_name: string, name: string, id: number}>) => {
		console.log(event.detail);
	}

</script>

<form on:submit|preventDefault>
	<ChooseRepo repos={data.repos} on:new={handleCreateNew} on:select={handleFromRepo} />
</form>