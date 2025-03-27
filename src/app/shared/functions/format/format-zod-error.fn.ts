import type { z } from 'zod';

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
