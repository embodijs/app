<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<section>
	{@render children()}
</section>

<style lang="postcss">
	section {
		margin: 0 auto;
		max-width: 840px;
	}
</style>
