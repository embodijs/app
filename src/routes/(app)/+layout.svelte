<script lang="ts">
	import type { LayoutData } from './$types';
	import { Header } from '$components';
	import type { Snippet } from 'svelte';

	type Props = {
		data: LayoutData;
		children?: Snippet;
	};

	const { data, children }: Props = $props();
</script>

<Header user={data.user} />
{@render children?.()}
