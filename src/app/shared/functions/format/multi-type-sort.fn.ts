import { multiTypeCompare } from '../compare/multi-type-compare.fn';

/**
 * Sorts an array of objects by a given field, handling multiple types (number, string, date).
 * @param filtered The array to sort.
 * @param field The field to sort by.
 * @param direction The direction to sort in.
 * @returns The sorted array.
 */
export const multiTypeSort = <T>(
	filtered: T[],
	field: keyof T,
	direction: 'asc' | 'desc'
): T[] => {
	return filtered.sort((a, b) => {
		const current = (direction === 'asc' ? a : b)[field];
		const next = (direction === 'asc' ? b : a)[field];
		return multiTypeCompare(current, next);
	});
};
