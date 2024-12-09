<script lang="ts">
	import type { LayoutData } from './$types';
	import { SideNav, Toaster } from '$components';
	import type { Snippet } from 'svelte';

	type Props = {
		data: LayoutData;
		children?: Snippet;
	};

	const { data, children }: Props = $props();
</script>

<div class="frame">
	<Toaster>
		<header class="sidebar">
			<SideNav
				project={{
					name: 'Website',
					id: 'random'
				}}
				hrefs={{
					posts: '/posts',
					pages: '/pages',
					projects: '/projects'
				}}
				user={data.user}
			/>
		</header>
		<main>
			{@render children?.()}
		</main>
	</Toaster>
</div>

<style lang="postcss">
	.frame {
		display: grid;
		height: 100vh;
		grid-template-columns: auto 1fr;
	}

	.sidebar {
		background-color: var(--color-bg);
	}

	main {
		padding: 1rem;
	}
</style>
