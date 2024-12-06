<script lang="ts">
	import { Card } from 'flowbite-svelte';

	type Props = {
		href: string;
	};

	const { href }: Props = $props();
</script>

<Card {href} class="content-tile dashed clickable border">
	<i class="ri-add-large-line"></i>
	<span>Add a new project</span>
</Card>

<style>
	button {
		display: flex;
		height: 250px;
		width: 350px;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		cursor: pointer;
		color: var(--color-secondary-500);
	}

	button:hover {
		color: inherit;
	}

	button i {
		font-size: 3rem;
		padding: 0.5rem;
	}
</style>
