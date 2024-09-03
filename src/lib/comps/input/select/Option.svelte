<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { getSelectContext } from "./context";


	const { group, selected  } = getSelectContext();
	export let value: string | number;

	const dispatch = createEventDispatcher<{select: { name: string, value: string | number, type: "radio"}}>();


	const forId = `option-${group}-${value}`;

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if(target.checked) {
			dispatch("select", { name: group, value, type: "radio" });
		}
	}


</script>

<li>
	<input id={forId} type="radio" name={group} {value} checked={(!!selected && value === selected)} on:change={handleChange}  />
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
