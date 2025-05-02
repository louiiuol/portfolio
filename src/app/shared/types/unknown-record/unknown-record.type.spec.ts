import { isUnknownRecord } from './unknown-record.type';

describe('isUnknownRecord', () => {
	it('should return true for a valid UnknownRecord object', () => {
		const validRecord = { key: 'value', anotherKey: 123, boolKey: true };
		expect(isUnknownRecord(validRecord)).toBe(true);
	});

	it('should return true for an object with mixed types', () => {
		const mixedRecord = {
			key: 'value',
			numKey: 42,
			boolKey: false,
			nullKey: null,
		};
		expect(isUnknownRecord(mixedRecord)).toBe(true);
	});

	it('should return true for an object with nested objects', () => {
		const nestedRecord = { key: { nestedKey: 'value' } };
		expect(isUnknownRecord(nestedRecord)).toBe(true);
	});

	it('should return true for an object with an array value', () => {
		const arrayRecord = { key: [1, 2, 3] };
		expect(isUnknownRecord(arrayRecord)).toBe(true);
	});

	it('should return false for nullish value', () => {
		expect(isUnknownRecord(undefined)).toBe(false);
		expect(isUnknownRecord(null)).toBe(false);
	});

	it('should return false for a primitive value (string | number)', () => {
		expect(isUnknownRecord('string')).toBe(false);
		expect(isUnknownRecord(42)).toBe(false);
	});

	it('should return false for an array', () => {
		expect(isUnknownRecord(['value'])).toBe(false);
	});

	it('should return false for a function', () => {
		const func = () => {};
		expect(isUnknownRecord(func)).toBe(false);
	});
});
