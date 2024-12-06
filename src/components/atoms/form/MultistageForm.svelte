<script lang="ts">
	import Progress from '../Progress.svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import { initMultistageContext } from './multistageContext';
	initMultistageContext();
	let superForm: SuperForm<any>;
	export { superForm as super };
	const { enhance } = superForm;
</script>

<form method="POST" use:enhance>
	<Progress>
		<slot />
	</Progress>
</form>
