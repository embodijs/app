import { nanoid } from 'nanoid';
import { custom } from 'valibot';

export enum TYPEID {
	USER = 'u',
	SESSION = 'x',
	PROJECT = 'p'
}

export const generateId = <T extends TYPEID>(domain: T): TypeId<T> => {
	//encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	return `${domain}-${nanoid()}`;
};

export const validateTypeId = <T extends TYPEID>(domain: T, id: unknown): id is TypeId<T> => {
	return typeof id === 'string' && id.startsWith(`${domain}-`);
};

export const validateTypeIdPrepare =
	<T extends TYPEID>(domain: T) =>
	(id: unknown) => {
		return validateTypeId(domain, id);
	};

export const valibotTypeId = <T extends TYPEID>(domain: T) => {
	return custom<TypeId<T>>(validateTypeIdPrepare(domain));
};

export type TypeId<T extends TYPEID> = `${T}-${string}`;
