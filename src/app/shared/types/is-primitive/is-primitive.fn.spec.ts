import { isPrimitive } from './primitive.type';

describe('isPrimitive', () => {
	it('should return true for primitive values: string | number | boolean | symbol | bigint', () => {
		expect(isPrimitive('hello')).toBe(true);
		expect(isPrimitive(123)).toBe(true);
		expect(isPrimitive(true)).toBe(true);
		expect(isPrimitive(false)).toBe(true);
		expect(isPrimitive(Symbol('test'))).toBe(true);
		expect(isPrimitive(BigInt(123))).toBe(true);
	});

	it('should return false for nullish value', () => {
		expect(isPrimitive(null)).toBe(false);
		expect(isPrimitive(undefined)).toBe(false);
	});

	it('should return false for object', () => {
		expect(isPrimitive({})).toBe(false);
	});

	it('should return false for array', () => {
		expect(isPrimitive([])).toBe(false);
	});

	it('should return false for function', () => {
		expect(isPrimitive(() => {})).toBe(false);
	});

	it('should return false for class instance', () => {
		class TestClass {
			test = 'hello';
		}
		expect(isPrimitive(new TestClass())).toBe(false);
	});
});
