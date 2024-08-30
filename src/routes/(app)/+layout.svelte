
<script lang="ts">
	import { page } from '$app/stores';
	import { Logo, UserMenu } from '$lib/comps';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { user } = data;

</script>

<header>
	<Logo />
	<UserMenu {user} />
</header>
<slot />

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}


</style>