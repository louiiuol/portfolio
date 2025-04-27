import { z } from 'zod';
import { formatZodError } from './format-zod-error.fn';

describe('formatZodError', () => {
	it('should return null if no error is provided', () => {
		const result = formatZodError();
		expect(result).toBeNull();
	});

	it('should format a ZodError into a readable string', () => {
		const schema = z.object({
			name: z.string(),
			age: z.number(),
		});

		const result = schema.safeParse({
			name: 'John',
			age: 'invalid', // Invalid type
		});

		if (!result.success) {
			const formattedError = formatZodError(result.error);
			expect(formattedError).toContain('Invalid object:');
			expect(formattedError).toContain('age: Expected number, received string');
		}
	});

	it('should replace "Expected ..., received null/undefined" with "Required"', () => {
		const schema = z.object({
			name: z.string(),
			age: z.number(),
		});
		const result = schema.safeParse({
			name: null, // Invalid type
			age: undefined, // Invalid type
		});
		if (!result.success) {
			const formattedError = formatZodError(result.error);
			expect(formattedError).toContain('Invalid object:');
			expect(formattedError).toContain('name: Required');
			expect(formattedError).toContain('age: Required');
		}
	});
	it('should handle nested objects and format errors correctly', () => {
		const schema = z.object({
			user: z.object({
				name: z.string(),
				address: z.object({
					city: z.string(),
					zip: z.number(),
				}),
			}),
		});

		const result = schema.safeParse({
			user: {
				name: 'John',
				address: {
					city: 123, // Invalid type
					zip: 'invalid', // Invalid type
				},
			},
		});

		if (!result.success) {
			const formattedError = formatZodError(result.error);
			expect(formattedError).toContain('Invalid object:');
			expect(formattedError).toContain(
				'user.address.city: Expected string, received number'
			);
			expect(formattedError).toContain(
				'user.address.zip: Expected number, received string'
			);
		}
	});

	it('should handle arrays and format errors correctly', () => {
		const schema = z.object({
			tags: z.array(z.string()),
		});

		const result = schema.safeParse({
			tags: ['valid', 123, null], // Invalid types
		});

		if (!result.success) {
			const formattedError = formatZodError(result.error);
			expect(formattedError).toContain('Invalid object:');
			expect(formattedError).toContain(
				'tags.1: Expected string, received number'
			);
			expect(formattedError).toContain('tags.2: Required');
		}
	});

	it('should handle optional fields and format errors correctly', () => {
		const schema = z.object({
			name: z.string(),
			age: z.number().optional(),
		});

		const result = schema.safeParse({
			name: 'John',
			age: 'invalid', // Invalid type
		});

		if (!result.success) {
			const formattedError = formatZodError(result.error);
			expect(formattedError).toContain('Invalid object:');
			expect(formattedError).toContain('age: Expected number, received string');
		}
	});

	it('should handle custom error messages in schemas', () => {
		const schema = z.object({
			email: z.string().email('Invalid email format'),
		});

		const result = schema.safeParse({
			email: 'not-an-email', // Invalid email
		});

		if (!result.success) {
			const formattedError = formatZodError(result.error);
			expect(formattedError).toContain('Invalid object:');
			expect(formattedError).toContain('email: Invalid email format');
		}
	});
});
