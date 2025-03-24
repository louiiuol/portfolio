import { isObject } from '../type-checker/is-object.fn';

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
