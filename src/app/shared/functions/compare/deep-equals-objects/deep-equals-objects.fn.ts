import { isNotNullish } from '../../../types';
import { isObject } from '../../type-checker/is-object/is-object.fn';

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
	if ((!isNotNullish(obj1) && !isNotNullish(obj2)) || obj1 === obj2) {
		return true;
	}

	if (Array.isArray(obj1) && Array.isArray(obj2)) {
		return areArraysEqual(obj1, obj2);
	}

	if (isObject(obj1) && isObject(obj2)) {
		return areObjectsEqual(obj1, obj2);
	}

	return false;
}

function areObjectsEqual(
	obj1: Record<string, unknown>,
	obj2: Record<string, unknown>
): boolean {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	for (const key of keys1) {
		if (!(key in obj2) || !deepEqualObjects(obj1[key], obj2[key])) return false;
	}

	return true;
}

function areArraysEqual(arr1: unknown[], arr2: unknown[]): boolean {
	if (arr1.length !== arr2.length) return false;

	for (let i = 0; i < arr1.length; i++) {
		if (!deepEqualObjects(arr1[i], arr2[i])) return false;
	}

	return true;
}
