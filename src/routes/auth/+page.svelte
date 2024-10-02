<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	const githubAuthUrl = new URL('/auth/github', $page.url.origin);
	$: if (data.redirectTo) {
		githubAuthUrl.searchParams.set('redirect', data.redirectTo);
	}
</script>

<main>
	<section class="content-tile">
		<h1>Sign in</h1>
		<div class="sign-ins">
			<a role="button" href={githubAuthUrl.toString()}>
				<i class="ri-github-fill"></i>
				<span>Sign in with GitHub</span>
			</a>
		</div>
	</section>
</main>

<style lang="postcss">
	main {
		@apply flex flex-col items-center justify-center h-screen;
	}

	h1 {
		@apply text-3xl font-bold mb-7;
	}

	i {
		@apply mr-3 text-2xl;
	}

	div.sign-ins {
		@apply flex flex-col items-center;
	}
	a {
		@apply flex items-center justify-between w-full;
		@apply px-4 py-2 bg-gray-800 text-white rounded-md;
	}
	a:hover {
		@apply bg-gray-900;
	}
</style>
