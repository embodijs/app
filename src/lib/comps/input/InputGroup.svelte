<script lang="ts">
	import { generateUniqueId } from '$lib/helpers/crypto';
	import { initInputGroupContext } from './context';

	const forId = generateUniqueId();
	const { errors } = initInputGroupContext(forId);
</script>

<div>
	<slot id={forId} />
</div>

<style lang="postcss">
	div {
		display: flex;
		flex-direction: row;
		margin: 1rem;
		@apply border-2 border-gray-300 rounded-md border-r-0;
		overflow: hidden;
	}

	div :global(label),
	div :global(input),
	div :global(textarea) {
		@apply p-3 border-x-2 border-zinc-300;
		margin-left: -1px;
	}

	div :global(input),
	div :global(textarea) {
		flex: 1;
	}

	div :global(label) {
		@apply bg-zinc-200;
		width: max-content;
		text-wrap: nowrap;
	}
</style>
