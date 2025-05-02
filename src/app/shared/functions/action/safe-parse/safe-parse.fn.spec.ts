import { safeParse } from './safe-parse.fn';

describe('SafeParse', () => {
	it('should handle nullish values & empty string (returns null)', () => {
		expect(safeParse('')).toBeNull();
		expect(safeParse(null)).toBeNull();
		expect(safeParse('null')).toBeNull();
		expect(safeParse(undefined)).toBeNull();
	});

	it('should handle primitive raw values', () => {
		const rawString = 'testString';
		const rawNumber = 42;
		const rawTrue = true;
		const rawFalse = false;
		expect(safeParse(rawString)).toBe(rawString);
		expect(safeParse(String(rawNumber))).toBe(rawNumber);
		expect(safeParse(String(rawTrue))).toBe(rawTrue);
		expect(safeParse(String(rawFalse))).toBe(rawFalse);
	});

	it('should handle valid JSON strings', () => {
		const jsonString = '{"key": "value"}';
		const jsonArray = '[1, 2, 3]';
		expect(safeParse(jsonString)).toEqual({ key: 'value' });
		expect(safeParse(jsonArray)).toEqual([1, 2, 3]);
	});

	it('should return null for invalid JSON strings', () => {
		const invalidJson = '{key: value}';
		const anotherInvalidJson = '[1, 2, 3';
		expect(safeParse(invalidJson)).toBeNull();
		expect(safeParse(anotherInvalidJson)).toBeNull();
	});

	it('should return null for empty strings', () => {
		const emptyString = '';
		const emptyArray = '[]';
		const emptyObject = '{}';
		expect(safeParse(emptyString)).toBeNull();
		expect(safeParse(emptyArray)).toEqual([]);
		expect(safeParse(emptyObject)).toEqual({});
	});
});
