<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from 'flowbite-svelte';

	type Props = {
		headline: string;
		add?: {
			name: string;
			icon?: string;
			href: string;
		};
		children?: Snippet;
	};

	const { headline, add, children }: Props = $props();
</script>

<main>
	<header>
		<h1>{headline}</h1>
		{#if add}
			<Button size="lg" color="green" href={add.href}>
				{#if add.icon}
					<i class={add.icon}></i>
				{:else}
					<i class="ri-add-line ri-2xl"></i>
				{/if}
				{add.name}
			</Button>
		{/if}
	</header>
	{@render children?.()}
</main>

<style lang="postcss">
	main {
		@apply p-3;
	}

	header {
		@apply flex items-center justify-between;
		@apply pb-7 pt-3;
	}

	h1 {
		@apply text-3xl font-bold;
	}
</style>
