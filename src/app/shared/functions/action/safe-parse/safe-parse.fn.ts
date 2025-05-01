import type { nullish } from '@shared/types';

/**
 * Parse stringified JSON, handling primitive values.
 */
export const safeParse = (raw: string | nullish): unknown => {
	if (raw === null || raw === undefined) {
		return null;
	}
	try {
		return JSON.parse(raw);
	} catch {
		// In this case, it's a primitive value
		return raw;
	}
};
