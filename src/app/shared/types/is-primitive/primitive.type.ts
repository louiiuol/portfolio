export type primitive = string | number | boolean | symbol | bigint;

export const isPrimitive = (value: unknown): value is primitive => {
	if (value === null || value === undefined) {
		return false;
	}

	if (Array.isArray(value)) {
		return false;
	}

	if (typeof value === 'object') {
		return false;
	}

	if (typeof value === 'function') {
		return false;
	}

	return true;
};
