export function isEmpty(obj: object) {
	for (const prop in obj) {
		if (Object.hasOwn(obj, prop)) {
			return false;
		}
	}

	return true;
}

export function isEmptyObject(
	value: unknown
): value is Exclude<unknown, object> {
	if (value == null) {
		// null or undefined
		return false;
	}

	if (typeof value !== 'object') {
		// boolean, number, string, function, etc.
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const proto = Object.getPrototypeOf(value);

	// consider `Object.create(null)`, commonly used as a safe map
	// before `Map` support, an empty object as well as `{}`
	if (proto !== null && proto !== Object.prototype) {
		return false;
	}

	return isEmpty(value);
}
