<script lang="ts">
	import { generateUniqueId } from '$lib/helpers/crypto';
	import { getMultistageContext } from './multistageContext';
	const { stages, stage, progress } = getMultistageContext();

	const id = generateUniqueId();

	export let to: number;
	export let name: string | undefined = undefined;

	stages.add({ id, level: to, name });

	const setProgress = (to: number) => {
		progress.set(to);
	};
</script>

{#if $stage?.id === id}
	<slot {id} {setProgress} />
{/if}
