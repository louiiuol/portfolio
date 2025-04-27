/**
 * Checks input value is a non-nullish object.
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && !Array.isArray(value) && value !== null;
}
