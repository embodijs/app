import type { NonNil, SomeRecord } from './type';

export function removeNil<T extends SomeRecord>(obj: T): NonNil<T> {
	return <NonNil<T>>Object.fromEntries(Object.entries(obj).filter(([, value]) => value != null));
}
