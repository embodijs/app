<script lang="ts">
	import { ChooseRepo } from "$lib/comps/project";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<form>
	<ChooseRepo repos={data.repos} />
</form>