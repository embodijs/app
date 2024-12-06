<script lang="ts" module>
	import type { User } from '../molecules/UserMenu.svelte';
	export type Props = {
		user: User;
	};
</script>

<script lang="ts">
	import { Logo, UserMenu } from '../molecules';

	const { user } = $props();
</script>

<header>
	<Logo />
	<UserMenu {user} />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}
</style>
