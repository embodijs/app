import { nanoid } from 'nanoid';

export enum TYPEID {
	USER = 'u',
	SESSION = 'x'
}

export const generateId = <T extends TYPEID>(domain: T): TypeId<T> => {
	return `${domain}-${nanoid()}`;
};

export type TypeId<T extends TYPEID> = `${T}-${string}`;
