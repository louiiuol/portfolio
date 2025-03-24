export function multiTypeCompare<T>(a: T, b: T): number {
	if (typeof a === 'string' && typeof b === 'string') {
		return a.localeCompare(b);
	}
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}
	return 0;
}
