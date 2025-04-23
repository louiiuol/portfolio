import { isObject } from '../type-checker/is-object.fn';

/**
 * Compares two objects deeply to determine if they are equal.
 *
 * This function performs a deep comparison of two objects, including their nested properties.
 * It handles cases where the objects are `null` or `undefined` and ensures that all keys and
 * values match recursively.
 *
 * @param obj1 - The first object to compare. Can be of any type.
 * @param obj2 - The second object to compare. Can be of any type.
 * @returns `true` if the objects are deeply equal, otherwise `false`.
 *
 * @example
 * ```typescript
 * const objA = { a: 1, b: { c: 2 } };
 * const objB = { a: 1, b: { c: 2 } };
 * const result = deepEqualObjects(objA, objB); // true
 * ```
 *
 * @remarks
 * - The function uses recursion to compare nested objects.
 * - It relies on the `isObject` utility function to check if a value is an object.
 * - If the objects have different numbers of keys, they are considered unequal.
 */
export function deepEqualObjects(obj1: unknown, obj2: unknown): boolean {
	// Base case: If both objects are identical, return true.

	if (
		(obj1 === null && obj2 === undefined) ||
		(obj1 === undefined && obj2 === null)
	) {
		return true;
	}

	if (obj1 === obj2) {
		return true;
	}

	// Check if both are non-null objects:
	if (!isObject(obj1) || !isObject(obj2)) {
		return false;
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		// 'keys2.includes(key)' checks the key existence in obj2
		// Then we compare the nested values recursively
		if (!keys2.includes(key) || !deepEqualObjects(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}
