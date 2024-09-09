import { nanoid } from 'nanoid';
import { startsWith } from 'valibot';

export enum TYPEID {
	USER = 'u',
	SESSION = 'x',
	PROJECT = 'p'
}

export const generateId = <T extends TYPEID>(domain: T): TypeId<T> => {
	return `${domain}-${nanoid()}`;
};

export const valibotTypeId = <T extends TYPEID>(domain: T) => {
	return startsWith(`${domain}_`);
};

export type TypeId<T extends TYPEID> = `${T}-${string}`;
