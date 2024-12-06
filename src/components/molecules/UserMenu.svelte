<script lang="ts" module>
	import { Avatar } from 'flowbite-svelte';
	export type User = { name: string; avatar?: string };
</script>

<script lang="ts">
	const { user }: { user: User } = $props();
</script>

<div>
	<div>
		<span>Hello, {user.name}</span>
		{#if user.avatar}
			<Avatar src={user.avatar} />
		{/if}
	</div>
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
	}

	span {
		padding: 0.5rem;
		font-weight: 600;
	}
</style>
