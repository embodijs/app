<script lang="ts">
	import type { LayoutData } from './$types';
	import { Header, Toaster } from '$components';
	import type { Snippet } from 'svelte';

	type Props = {
		data: LayoutData;
		children?: Snippet;
	};

	const { data, children }: Props = $props();
</script>

<Toaster>
	<Header user={data.user} />
	{@render children?.()}
</Toaster>
