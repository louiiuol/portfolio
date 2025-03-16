export type nullish = null | undefined;

export function isNullish(obj: unknown): obj is nullish {
	return obj === null || obj === undefined;
}

export function isNotNullish<T>(obj: T): obj is Exclude<T, nullish> {
	return obj !== null && obj !== undefined;
}

export type NonNullish<T> =
	// If T is an array, recursively strip nullish from each element
	T extends (infer U)[]
		? NonNullish<U>[]
		: // If T is an object, recurse over its properties
			T extends object
			? {
					[K in keyof T as T[K] extends null | undefined
						? never
						: K]: NonNullish<NonNullable<T[K]>>;
				}
			: // Otherwise (primitive), return as-is
				T;
