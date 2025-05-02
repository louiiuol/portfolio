import { type nullish } from '@shared/types';

/**
 * Parse stringified JSON, handling primitive values gracefully.
 * @param raw - The string to parse.
 * @returns The parsed value, or null if parsing fails or the input is empty.
 * * Handles primitive-like values (true, false, null) and invalid JSON gracefully.
 * * Returns the trimmed string itself if parsing fails.
 * * Returns null for empty strings or nullish values.
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

/**
 * Check if the error message indicates an invalid JSON structure.
 * @param message - The error message to check.
 * @returns True if the error message indicates an invalid JSON structure, false otherwise.
 */
const isInvalidJsonStructureError = (message: string): boolean =>
	!!(
		/Expected property name or '}'/.test(message) ||
		+/Expected ',' or ']' after array element/.test(message) ||
		+/Unexpected end of JSON input/.test(message)
	);
