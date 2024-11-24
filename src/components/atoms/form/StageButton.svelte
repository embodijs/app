<script lang="ts">
	import Button from '../input/Button.svelte';
	import { getMultistageContext } from './multistageContext';

	export let to: number;
	export let previous: boolean = false;

	const { progress } = getMultistageContext();

	const setProgress = () => {
		progress.set(to);
	};
</script>

<Button on:click={setProgress} on:click on:dblclick type={previous ? 'ghost' : 'primary'}>
	<slot />
</Button>
