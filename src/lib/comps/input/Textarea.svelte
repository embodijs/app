<script lang="ts">
	import { generateUniqueId } from '$lib/helpers/crypto';

	const forId = generateUniqueId();

	export let value: string | undefined = undefined;
	export let label: string | undefined = undefined;
	export let name: string;
</script>

<div>
	<label for={forId}><slot>{label}</slot></label>
	<textarea id={forId} {name} bind:value />
</div>

<style lang="postcss">
	div {
		display: flex;
		flex-direction: column;
		margin: 1rem;
		overflow: hidden;
		@apply border-2 border-zinc-300 rounded-md;
	}

	label {
		display: block;
		padding: 0.3rem 0.7rem;
		@apply bg-zinc-200;
		text-align: end;
	}

	textarea {
		@apply p-1;
		width: 100%;
	}
</style>
