<script lang="ts">
	import { initProgressStore } from '$lib/stores/progress';

	const progress = initProgressStore();
</script>

<div class="progress">
	<div class="bar" style="width: {$progress}%"></div>
</div>
<slot />

<style lang="postcss">
	.progress {
		background-color: var(--color-bg-2);
		border-radius: 0.5rem;
		height: 0.5rem;
		overflow: hidden;
	}

	.bar {
		background-color: var(--color-primary);
		height: 100%;
	}
</style>
