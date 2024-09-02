<script lang="ts">
	import { getSelectContext } from "./context";


	const { group, selected  } = getSelectContext();
	export let value: string;

	const forId = `option-${group}-${value}`;


</script>

<li>
	<input id={forId} type="radio" name={group} {value} checked={(!!selected && value === selected)}  />
	<label for={forId}>
			<slot>{value}</slot>
	</label>
</li>

<style>
	li {
		list-style: none;

	}

	label:hover {
		background-color: var(--color-primary-200);
	}

	label {
		display: block;

		padding: var(--space-2);
		border: var(--border-light-1);

		cursor: pointer;
	}

	input {
		display: none;
	}

	input:checked + label {
		background-color: var(--color-primary-700);
		color: var(--color-text-inverse)
	}
</style>
