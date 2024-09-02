<script lang="ts">
	import { getSelectContext } from "./context";


	const { group, selected  } = getSelectContext();
	export let value: string;


</script>

<li>
	<label>
			<slot>value</slot>
			<input type="radio" name={group} {value} checked={value === selected}  />
	</label>

</li>

<style>
	li {
		list-style: none;

	}

	input {
		display: none;
	}
</style>
