import type { User } from 'lucia';
import { getContext, hasContext, setContext } from 'svelte';

const CONTEXT = Symbol('user');

export const initUserContext = (user: User) => {
	setContext(CONTEXT, user);
};

export const getUserStore = (): User => {
	return getContext(CONTEXT);
};

export const existsUserStore = (): boolean => {
	return hasContext(CONTEXT);
};
