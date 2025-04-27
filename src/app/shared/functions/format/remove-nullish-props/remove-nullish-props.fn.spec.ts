import { removeNullishProps } from './remove-nullish-props.fn';

describe('removeNullishProps', () => {
	it('should return the same value if input is not an object or array', () => {
		expect(removeNullishProps(42)).toBe(42);
		expect(removeNullishProps('string')).toBe('string');
		expect(removeNullishProps(null)).toBe(null);
		expect(removeNullishProps(undefined)).toBe(undefined);
	});

	it('should remove nullish values from an array', () => {
		const input = [1, null, 2, undefined, '', 3];
		const expected = [1, 2, 3];
		expect(removeNullishProps(input)).toEqual(expected);
	});

	it('should remove nullish properties from an object', () => {
		const input = { a: 1, b: null, c: undefined, d: '', e: 2 };
		const expected: any = { a: 1, e: 2 };
		expect(removeNullishProps(input)).toEqual(expected);
	});

	it('should handle nested objects and arrays', () => {
		const input = {
			a: 1,
			b: null,
			c: {
				d: undefined,
				e: '',
				f: [null, 2, undefined, '', 3],
			},
			g: [null, { h: '', i: 4 }, undefined],
		};
		const expected: any = {
			a: 1,
			c: {
				f: [2, 3],
			},
			g: [{ i: 4 }],
		};
		expect(removeNullishProps(input)).toEqual(expected);
	});

	it('should handle empty objects and arrays', () => {
		expect(removeNullishProps({})).toEqual({});
		expect(removeNullishProps([])).toEqual([]);
	});

	it('should remove empty arrays from objects', () => {
		const input = { a: [], b: [1, 2], c: null };
		const expected: any = { b: [1, 2] };
		expect(removeNullishProps(input)).toEqual(expected);
	});

	it('should handle complex nested structures', () => {
		const input = {
			a: null,
			b: {
				c: [null, { d: undefined, e: 5 }, '', 6],
				f: '',
			},
			g: [null, undefined, { h: '', i: [7, null] }],
		};
		const expected: any = {
			b: {
				c: [{ e: 5 }, 6],
			},
			g: [{ i: [7] }],
		};
		expect(removeNullishProps(input)).toEqual(expected);
	});
});
