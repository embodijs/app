import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import flowbit from 'flowbite/plugin';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		color: {
			// flowbite-svelte
			primary: {
				50: '#FFF5F2',
				100: '#FFF1EE',
				200: '#FFE4DE',
				300: '#FFD5CC',
				400: '#FFBCAD',
				500: '#FE795D',
				600: '#EF562F',
				700: '#EB4F27',
				800: '#CC4522',
				900: '#A5371B'
			}
		},
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px'
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif']
		},
		extend: {}
	},

	plugins: [typography, forms, containerQueries, aspectRatio, flowbit]
} satisfies Config;
