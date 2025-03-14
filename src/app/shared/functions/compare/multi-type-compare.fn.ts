/**
 * Compares two values of the same type and returns a numeric value indicating their relative order.
 *
 * The comparison logic is based on the type of the input values:
 * - Strings are compared using `localeCompare`.
 * - Numbers are compared using subtraction.
 * - Dates are compared based on their time values.
 * - Booleans are compared by converting them to numbers (`true` as 1, `false` as 0).
 * - Arrays are compared based on their lengths.
 *
 * If the types of the inputs do not match or are not handled explicitly, the function returns `0`.
 *
 * @typeParam T - The type of the input values to compare.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns A numeric value indicating the relative order of the inputs:
 * - A negative number if `a` is less than `b`.
 * - Zero if `a` is equal to `b`.
 * - A positive number if `a` is greater than `b`.
 */
export function multiTypeCompare<T>(a: T, b: T): number {
	if (typeof a === 'string' && typeof b === 'string') {
		return a.localeCompare(b);
	}
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}
	if (a instanceof Date && b instanceof Date) {
		return a.getTime() - b.getTime();
	}
	if (typeof a === 'boolean' && typeof b === 'boolean') {
		return Number(a) - Number(b);
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		return a.length - b.length;
	}

	return 0;
}
