import { environment } from '@env';
import type { z } from 'zod';
import { formatZodError } from '../format/format-zod-error.fn';

/**
 * Validate an entry against a zod schema (allows to entry is inferred type of zodSchema)
 * @param entry entry to validate
 * @param schema schema to validate against
 * @param objectName name of the object to validate
 * @returns true if the entry is a valid schema type
 */
export function isSchemaType<T>(
	entry: unknown,
	schema: z.ZodType<T>,
	objectName = 'object'
): entry is T {
	const validation = schema.safeParse(entry);
	if (validation.error && !environment.production) {
		console.error(formatZodError(validation.error, `Invalid ${objectName}: `));
	}
	return validation.success;
}
