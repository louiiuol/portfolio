export function removeNullishProps<T extends Record<string, unknown>>(
	obj: T
): Partial<T> | T[] {
	if (typeof obj !== 'object' || !obj) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(o => removeNullishProps(o) as T);
	}

	return Object.entries(obj).reduce((acc: Partial<T>, [key, value]) => {
		if (value) {
			(acc as Record<string, unknown>)[key] = removeNullishProps(value);
		}
		return acc;
	}, {} satisfies Partial<T>);
}
