// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$infra/auth/lucia.server').SessionValidationResult['user'];
			session: import('$infra/auth/lucia.server').SessionValidationResult['session'];
		}
	}
}

export {};
