export type SomeRecord = Record<string | number | symbol, unknown>;

export type NonNil<T> = {
	[x in keyof T]-?: NonNullable<T[x]>;
};
