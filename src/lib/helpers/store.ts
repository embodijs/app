export const setPartial =
	<T extends Record<string | number | symbol, unknown>, U extends Partial<T>>(partialData: U) =>
	(data: T): T => ({
		...data,
		...partialData
	});
