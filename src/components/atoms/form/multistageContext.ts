import { getContext, setContext } from 'svelte';
import { derived, get, writable, type Writable } from 'svelte/store';

const CONTEXT = Symbol('multistageContext');

interface Stage {
	id: string;
	level: number;
	name?: string;
}

const createStore = () => {
	const stages = writable<Stage[]>();
	const progress = writable<number>(0);
	const stage = derived([stages, progress], ([$stages, $progress]) => {
		const stages = [...($stages ?? [])];
		if (stages.length === 0) return undefined;
		return stages.find((stage) => stage.level > $progress);
	});

	return {
		stage,
		stages: {
			subscribe: stages.subscribe,
			add: (stage: Stage) => {
				stages.update((store) => {
					return [...(store ?? []), stage];
				});
			}
		},
		progress: {
			subscribe: progress.subscribe,
			set: progress.set
		}
	};
};

export const initMultistageContext = () => {
	const store = createStore();
	setContext(CONTEXT, store);
	return store;
};

export const getMultistageContext = () => {
	return getContext<ReturnType<typeof createStore>>(CONTEXT);
};
