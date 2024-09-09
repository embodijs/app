
<script lang="ts">
	import { getContext } from "svelte";
	import { getInputGroupContext } from "./context";

	export let value: string = '';
	export let name: string = '';

	const groupStore = getInputGroupContext();
</script>


<input type="text" bind:value={value} {name} {...$$restProps} on:change on:click on:blur />
