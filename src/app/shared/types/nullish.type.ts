export type nullish = null | undefined;

export function isNullish(obj: unknown): obj is nullish {
	return obj === null || obj === undefined;
}

export function isNotNullish<T>(obj: T): obj is Exclude<T, nullish> {
	return obj !== null && obj !== undefined;
}
