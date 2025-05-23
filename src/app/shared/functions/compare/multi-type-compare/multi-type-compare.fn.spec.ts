import { multiTypeCompare } from './multi-type-compare.fn';

describe('multiTypeCompare', () => {
	it('should compare strings using localeCompare', () => {
		expect(multiTypeCompare('apple', 'banana')).toBeLessThan(0);
		expect(multiTypeCompare('banana', 'apple')).toBeGreaterThan(0);
		expect(multiTypeCompare('apple', 'apple')).toBe(0);
	});

	it('should compare numbers using subtraction', () => {
		expect(multiTypeCompare(10, 20)).toBeLessThan(0);
		expect(multiTypeCompare(20, 10)).toBeGreaterThan(0);
		expect(multiTypeCompare(10, 10)).toBe(0);
	});

	it('should compare dates based on their time values', () => {
		const date1 = new Date('2023-01-01');
		const date2 = new Date('2023-01-02');
		expect(multiTypeCompare(date1, date2)).toBeLessThan(0);
		expect(multiTypeCompare(date2, date1)).toBeGreaterThan(0);
		expect(multiTypeCompare(date1, date1)).toBe(0);
	});

	it('should compare booleans by converting them to numbers', () => {
		expect(multiTypeCompare(true, false)).toBeGreaterThan(0);
		expect(multiTypeCompare(false, true)).toBeLessThan(0);
		expect(multiTypeCompare(true, true)).toBe(0);
		expect(multiTypeCompare(false, false)).toBe(0);
	});

	it('should compare arrays based on their lengths', () => {
		expect(multiTypeCompare([1, 2], [1, 2, 3])).toBeLessThan(0);
		expect(multiTypeCompare([1, 2, 3], [1, 2])).toBeGreaterThan(0);
		expect(multiTypeCompare([1, 2], [1, 2])).toBe(0);
	});

	it('should handle null and undefined values', () => {
		expect(multiTypeCompare(null, null)).toBe(0);
		expect(multiTypeCompare(undefined, undefined)).toBe(0);
		expect(multiTypeCompare(null, undefined)).toBe(0);
		expect(multiTypeCompare(undefined, null)).toBe(0);
	});

	it('should return 0 for unsupported types', () => {
		expect(multiTypeCompare({}, {})).toBe(0);
		expect(multiTypeCompare([], {})).toBe(0);
		expect(multiTypeCompare({}, [])).toBe(0);
	});

	it('should return 0 for mixed types', () => {
		expect(multiTypeCompare('string', 10 as any)).toBe(0);
		expect(multiTypeCompare(10, 'string' as any)).toBe(0);
		expect(multiTypeCompare(true, 'string' as any)).toBe(0);
		expect(multiTypeCompare('string', true as any)).toBe(0);
	});

	it('should return 0 for mixed types with null and undefined', () => {
		expect(multiTypeCompare(null, 'string')).toBe(0);
		expect(multiTypeCompare('string', null)).toBe(0);
		expect(multiTypeCompare(undefined, 'string')).toBe(0);
		expect(multiTypeCompare('string', undefined)).toBe(0);
	});
});
