<script lang="ts">
	import type { PageData } from './$types';
	import { OAuthButton } from '$components';

	let { data }: { data: PageData } = $props();
</script>

<main>
	<section class="content-tile">
		<h1>Sign in</h1>
		<div class="sign-ins">
			<OAuthButton service="GitHub" color="dark" redirect={data.redirectTo} />
		</div>
	</section>
</main>

<style lang="postcss">
	main {
		@apply flex h-screen flex-col items-center justify-center;
	}

	h1 {
		@apply mb-7 text-3xl font-bold;
	}

	i {
		@apply mr-3 text-2xl;
	}

	div.sign-ins {
		@apply flex flex-col items-center;
	}
</style>
