<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<main>
	<h1>Hello, {data.user.name}</h1>
</main>