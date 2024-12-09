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
