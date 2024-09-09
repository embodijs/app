import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT_NAME = Symbol('input-group-context');

export const generateContextValue = (id: string) => {
	const errors = writable(null);
	return { id, errors };
};

export const initInputGroupContext = (id: string) => {
	const contextValue = generateContextValue(id);
	setContext(CONTEXT_NAME, generateContextValue(id));
	return contextValue;
};

export const getInputGroupContext = () => {
	return getContext<ReturnType<typeof generateContextValue>>(CONTEXT_NAME);
};
