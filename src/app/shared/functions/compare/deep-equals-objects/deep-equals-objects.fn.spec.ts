import { deepEqualObjects } from './deep-equals-objects.fn';

describe('deepEqualObjects', () => {
	it('should return true for identical objects', () => {
		const objA = { a: 1, b: { c: 2 } };
		const objB = { a: 1, b: { c: 2 } };
		expect(deepEqualObjects(objA, objB)).toBe(true);
	});

	it('should return false for objects with different values', () => {
		const objA = { a: 1, b: { c: 2 } };
		const objB = { a: 1, b: { c: 3 } };
		expect(deepEqualObjects(objA, objB)).toBe(false);
	});

	it('should return false for objects with different keys', () => {
		const objA = { a: 1, b: { c: 2 } };
		const objB = { a: 1, d: { c: 2 } };
		expect(deepEqualObjects(objA, objB)).toBe(false);
	});

	it('should return true for deeply nested identical objects', () => {
		const objA = { a: { b: { c: { d: 1 } } } };
		const objB = { a: { b: { c: { d: 1 } } } };
		expect(deepEqualObjects(objA, objB)).toBe(true);
	});

	it('should return false for deeply nested objects with different values', () => {
		const objA = { a: { b: { c: { d: 1 } } } };
		const objB = { a: { b: { c: { d: 2 } } } };
		expect(deepEqualObjects(objA, objB)).toBe(false);
	});

	it('should return true for null and undefined comparison', () => {
		expect(deepEqualObjects(null, undefined)).toBe(true);
		expect(deepEqualObjects(undefined, null)).toBe(true);
	});

	it('should return false for null and non-null objects', () => {
		expect(deepEqualObjects(null, {})).toBe(false);
		expect(deepEqualObjects({}, null)).toBe(false);
	});

	it('should return false for primitive values', () => {
		expect(deepEqualObjects(1, 2)).toBe(false);
		expect(deepEqualObjects('a', 'b')).toBe(false);
	});

	it('should return true for identical arrays', () => {
		const arrA = [1, 2, 3];
		const arrB = [1, 2, 3];
		expect(deepEqualObjects(arrA, arrB)).toBe(true);
	});

	it('should return false for arrays with different elements', () => {
		const arrA = [1, 2, 3];
		const arrB = [1, 2, 4];
		expect(deepEqualObjects(arrA, arrB)).toBe(false);
	});

	it('should return false for objects and arrays comparison', () => {
		const obj = { a: 1, b: 2 };
		const arr = [1, 2];
		expect(deepEqualObjects(obj, arr)).toBe(false);
	});

	it('should return true for empty objects', () => {
		expect(deepEqualObjects({}, {})).toBe(true);
	});

	it('should return true for empty arrays', () => {
		expect(deepEqualObjects([], [])).toBe(true);
	});

	it('should return false for objects with different number of keys', () => {
		const objA = { a: 1 };
		const objB = { a: 1, b: 2 };
		expect(deepEqualObjects(objA, objB)).toBe(false);
	});

	it('should handle Date objects correctly', () => {
		const date1 = new Date('2023-01-01');
		const date2 = new Date('2023-01-01');
		const date3 = new Date('2023-01-02');

		expect(deepEqualObjects(date1, date2)).toBe(true);
		expect(deepEqualObjects(date1, date3)).toBe(false);
	});

	it('should handle objects with methods correctly', () => {
		const obj1 = {
			id: 1,
			method: function () {
				return 'test';
			},
		};
		const obj2 = {
			id: 1,
			method: function () {
				return 'test';
			},
		};
		const obj3 = {
			id: 1,
			method: function () {
				return 'different';
			},
		};

		// Note: Function equality is typically handled by reference,
		// so this might fail unless deepEqualObjects has special handling
		expect(deepEqualObjects(obj1, obj2)).toBe(true);
		expect(deepEqualObjects(obj1, obj3)).toBe(false);
	});

	it('should return false for objects with different types', () => {
		const objA = { a: 1, b: 'string' };
		const objB = { a: 1, b: 2 };
		expect(deepEqualObjects(objA, objB)).toBe(false);
	});

	it('should return false if arrays have different lengths', () => {
		const arrA = [1, 2, 3];
		const arrB = [1, 2];
		expect(deepEqualObjects(arrA, arrB)).toBe(false);
	});
});
