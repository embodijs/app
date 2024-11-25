import { nanoid } from 'nanoid';
import { custom } from 'valibot';

export enum TYPEID {
	USER = 'u',
	SESSION = 'x',
	PROJECT = 'p',
	GITHUB = 'hub',
	GITLAB = 'lab'
}

export const generateId = <T extends TYPEID>(
	domain: T,
	id: string | number = nanoid()
): TypeId<T> => {
	//encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	return `${domain}-${id}`;
};

export const validateTypeId = <T extends TYPEID>(domain: T, id: unknown): id is TypeId<T> => {
	return typeof id === 'string' && id.startsWith(`${domain}-`);
};

export const validateTypeIdPrepare =
	<T extends TYPEID>(...domains: T[]) =>
	(id: unknown) => {
		return domains.some((domain) => validateTypeId(domain, id));
	};

export const valibotTypeId = <T extends TYPEID>(...domains: T[]) => {
	return custom<TypeId<T>>(validateTypeIdPrepare(...domains));
};

export type TypeId<T extends TYPEID> = `${T}-${string}`;
