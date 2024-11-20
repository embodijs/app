import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$epp: './src/model/application',
			$def: './src/model/definitions',
			$db: './src/model/infrastructure/database',
			$infra: './src/model/infrastructure',
			'$domain/account': './src/routes/(app)/account',
			'$domain/auth': './src/routes/auth',
			$api: './src/routes/api',
			$stores: './src/stores',
			$validation: './src/model/validation',
			$core: './src/model/core',
			$data: './src/model/infrastructure'
		}
	}
};

export default config;
