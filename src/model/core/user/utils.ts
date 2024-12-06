import type { User } from './types';

export const createSessionUser = (user: User, session: NonNullable<App.Locals['session']>) => ({
	...user,
	accessToken: session.accessToken
});
