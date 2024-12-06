import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CONTEXT = Symbol('progress');

export const initProgressStore = () => {
	const store = writable(0);
	setContext(CONTEXT, store);
	return store;
};

export const getProgressStore = () => {
	return getContext<number>(CONTEXT);
};
