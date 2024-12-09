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

		{@render children?.()}
	</Toaster>
</div>

<style lang="postcss">
	.frame {
		display: grid;
		height: 100vh;
		grid-template-columns: auto 1fr;
	}
</style>
