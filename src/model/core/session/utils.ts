import type { User } from '../user';

export const createSessionUser = (user: User, session: NonNullable<App.Locals['session']>) => ({
	...user,
	accessToken: session.accessToken
});
