export type nullish = null | undefined;

export function isNullish(obj: unknown): obj is nullish {
	return obj === null || obj === undefined;
}

export function isNotNullish(obj: unknown): obj is Exclude<unknown, nullish> {
	return obj !== null && obj !== undefined;
}
