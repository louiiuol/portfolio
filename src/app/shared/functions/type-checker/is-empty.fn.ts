/**
 * Checks if an object is empty. An object is considered empty if it has no own properties.
 *
 * @param obj - The object to check.
 * @returns True if the object is empty or nullish, false otherwise.
 */
export function isEmpty(obj: object) {
	for (const prop in obj) {
		if (Object.hasOwn(obj, prop)) {
			return false;
		}
	}

	return true;
}
