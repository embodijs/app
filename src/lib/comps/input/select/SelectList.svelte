<script lang="ts">
	import { setSelectContext } from './context';

	export let name: string;
	export let selected: string | undefined = undefined;

	setSelectContext({ group: name, selected });
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
