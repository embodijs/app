<script lang="ts" module>
	import { Avatar } from 'flowbite-svelte';
	export type User = { name: string; avatar?: string };
</script>

<script lang="ts">
	const { user }: { user: User } = $props();
</script>

<button>
	<span>{user.name}</span>
	{#if user.avatar}
		<Avatar src={user.avatar} />
	{/if}
</button>

<style lang="postcss">
	button {
		@apply w-full;
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}

	span {
		@apply w-full text-left font-bold;
	}
</style>
