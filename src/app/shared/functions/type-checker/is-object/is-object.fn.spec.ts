import { isObject } from './is-object.fn';

describe('isObject', () => {
	it('should return true for a plain object', () => {
		expect(isObject({})).toBe(true);
	});

	it('should return true for an object with properties', () => {
		expect(isObject({ key: 'value' })).toBe(true);
	});

	it('should return false for null', () => {
		expect(isObject(null)).toBe(false);
	});

	it('should return false for an array', () => {
		expect(isObject([])).toBe(false);
	});

	it('should return false for a string', () => {
		expect(isObject('string')).toBe(false);
	});

	it('should return false for a number', () => {
		expect(isObject(42)).toBe(false);
	});

	it('should return false for a boolean', () => {
		expect(isObject(true)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isObject(undefined)).toBe(false);
	});

	it('should return false for a function', () => {
		expect(isObject(() => {})).toBe(false);
	});

	it('should return true for an instance of a class', () => {
		class MyClass {
			test: string = 'test';
		}
		expect(isObject(new MyClass())).toBe(true);
	});
});
