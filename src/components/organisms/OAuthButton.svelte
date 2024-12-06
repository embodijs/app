<script lang="ts">
	import { Button, type ButtonColorType } from 'flowbite-svelte';
	import { page } from '$app/stores';

	type Props = {
		redirect?: string;
		color?: ButtonColorType;
		service: string;
	};

	const { redirect, color, service }: Props = $props();

	const defineButtonClass = (service: string) => {
		return `ri-${service.toLowerCase()}-fill`;
	};

	const defineAuthUrl = (service: string, redirect?: string) => {
		const authUrl = new URL(`/auth/${service.toLowerCase()}`, $page.url.origin);
		if (redirect) {
			authUrl.searchParams.set('redirect', redirect);
		}
		return authUrl.toString();
	};
</script>

<Button {color} href={defineAuthUrl(service, redirect)}>
	<i class={defineButtonClass(service)}></i>
	<span>Sign in with {service}</span>
</Button>
