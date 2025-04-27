import { z } from 'zod';
import { isSchemaType } from './is-schema-type.fn';

describe('isSchemaType', () => {
	const schema = z.object({
		name: z.string(),
		age: z.number(),
	});

	it('should return true for a valid object', () => {
		const validObject = { name: 'John', age: 30 };
		expect(isSchemaType(validObject, schema)).toBe(true);
	});

	it('should return false for an invalid object', () => {
		const invalidObject = { name: 'John', age: 'thirty' };
		expect(isSchemaType(invalidObject, schema)).toBe(false);
	});

	it('should log an error when validation fails and logError is true', () => {
		const invalidObject = { name: 'John', age: 'thirty' };
		const consoleSpy = spyOn(console, 'error');
		isSchemaType(invalidObject, schema, 'TestObject', true);
		expect(consoleSpy).toHaveBeenCalled();
	});

	it('should not log an error when validation fails and logError is false', () => {
		const invalidObject = { name: 'John', age: 'thirty' };
		const consoleSpy = spyOn(console, 'error');
		isSchemaType(invalidObject, schema, 'TestObject', false);
		expect(consoleSpy).not.toHaveBeenCalled();
	});

	it('should return false for an entry that is not an object', () => {
		const invalidEntry = 'not-an-object';
		expect(isSchemaType(invalidEntry, schema)).toBe(false);
	});

	it('should handle optional fields in the schema', () => {
		const optionalSchema = z.object({
			name: z.string(),
			age: z.number().optional(),
		});
		const validObject = { name: 'John' };
		expect(isSchemaType(validObject, optionalSchema)).toBe(true);
	});

	it('should validate nested schemas', () => {
		const nestedSchema = z.object({
			user: z.object({
				name: z.string(),
				age: z.number(),
			}),
		});
		const validObject = { user: { name: 'John', age: 30 } };
		const invalidObject = { user: { name: 'John', age: 'thirty' } };
		expect(isSchemaType(validObject, nestedSchema)).toBe(true);
		expect(isSchemaType(invalidObject, nestedSchema)).toBe(false);
	});
});
