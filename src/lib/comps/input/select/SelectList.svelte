<script lang="ts">
	import { setSelectContext } from "./context";

	export let name: string;
	setSelectContext({ group: name });
</script>

<ul class="content-tile border">
	<slot></slot>
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		border: var(--border);
	}

</style>