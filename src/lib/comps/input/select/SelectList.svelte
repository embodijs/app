<script lang="ts">
	import { setContext } from "svelte";

	export let name: string;

	setContext('FormSelectorWheel', { group: name });
</script>

<ul>
	<slot></slot>
</ul>