<script lang="ts">
	type Props = {
		href: string;
		name: string;
	};

	const { href = '/projects', name }: Props = $props();
</script>

<div>
	<small class="title">Project</small>
	<div class="project">{name}</div>
	<a {href}><small>switch</small></a>
</div>

<style lang="postcss">
	.title {
		grid-column: span 2;
	}

	div.project {
		@apply p-0 text-2xl font-bold;
	}

	a {
		@apply text-sm text-blue-600;
	}

	div {
		@apply p-4;
		display: grid;
		justify-content: space-between;
		align-items: center;
		grid-template-rows: 2;
		grid-template-columns: 1fr auto;
	}
</style>
