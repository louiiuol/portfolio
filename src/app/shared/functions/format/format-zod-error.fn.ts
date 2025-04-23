import type { z } from 'zod';

/**
 * Formats a ZodError into a readable string.
 * @param error - The ZodError to format.
 * @param message - Optional message to prepend to the error string.
 * @returns A formatted string representing the error, or null if no error is provided.
 */
export const formatZodError = (
	error?: z.ZodError,
	message = 'Invalid object: '
): string | null => {
	if (!error) {
		return null;
	}
	return [
		`${message}`,
		...error.errors.map(
			err =>
				err.path.join('.') +
				': ' +
				err.message.replace(
					/^Expected .*, received (null|undefined)$/i,
					'Required'
				)
		),
	].join('\n - ');
};
