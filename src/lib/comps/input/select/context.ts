import { getContext, setContext } from 'svelte';

const CONTEXT = Symbol('group');

interface SelectContext {
	group: string;
	selected: string;
}

export const setSelectContext = (data: SelectContext): void => {
	setContext(CONTEXT, data);
};

export const getSelectContext = (): SelectContext => {
	return getContext(CONTEXT);
};
