import { isPrimitive } from './primitive.type';

describe('isPrimitive', () => {
	it('should return true for string', () => {
		expect(isPrimitive('hello')).toBe(true);
	});

	it('should return true for number', () => {
		expect(isPrimitive(123)).toBe(true);
	});

	it('should return true for boolean', () => {
		expect(isPrimitive(true)).toBe(true);
		expect(isPrimitive(false)).toBe(true);
	});

	it('should return false for null', () => {
		expect(isPrimitive(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isPrimitive(undefined)).toBe(false);
	});

	it('should return true for symbol', () => {
		expect(isPrimitive(Symbol('test'))).toBe(true);
	});

	it('should return true for bigint', () => {
		expect(isPrimitive(BigInt(123))).toBe(true);
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
