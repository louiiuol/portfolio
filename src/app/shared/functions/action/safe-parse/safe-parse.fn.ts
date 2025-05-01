import { type nullish } from '@shared/types';

/**
 * Parse stringified JSON, handling primitive values gracefully.
 */
export const safeParse = (raw: string | nullish): unknown => {
	if (!raw?.trim()) {
		return null;
	}

	const trimmed = raw.trim();

	try {
		return JSON.parse(trimmed);
	} catch (e) {
		if (!(e instanceof SyntaxError)) {
			throw new Error('An unexpected error occurred during parsing.', {
				cause: e,
			});
		}

		// Attempt to handle primitive-like values
		const lower = trimmed.toLowerCase();

		if (lower === 'true') {
			return true;
		}
		if (lower === 'false') {
			return false;
		}
		if (lower === 'null') {
			return null;
		}
		if (!isNaN(Number(trimmed))) {
			return Number(trimmed);
		}

		// Handle clearly invalid JSON structures
		if (isInvalidJsonStructureError(e.message)) {
			console.error(`Invalid stringified JSON: ${e.message}`, { cause: e });
			return null;
		}

		// As fallback, return the trimmed string itself
		return trimmed;
	}
};

const isInvalidJsonStructureError = (message: string): boolean => {
	return (
		message.startsWith("Expected property name or '}'") ||
		message.startsWith("Expected ',' or ']' after array element in JSON")
	);
};
