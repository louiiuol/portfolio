export type nullish = null | undefined;

export function isNullish(obj: unknown): obj is nullish {
	return obj === null || obj === undefined;
}

/**
 * Recursively strips out null/undefined props from any object or array;
 * If T is an array or an object, recursively strip nullish from each element /props, Otherwise (primitive), return as-is
 */
export type NonNullish<T> = T extends (infer U)[]
	? NonNullish<U>[]
	: T extends object
		? {
				[K in keyof T as T[K] extends null | undefined ? never : K]: NonNullish<
					NonNullable<T[K]>
				>;
			}
		: T;

export function isNotNullish<T>(obj: T): obj is Exclude<T, nullish> {
	return obj !== null && obj !== undefined;
}
