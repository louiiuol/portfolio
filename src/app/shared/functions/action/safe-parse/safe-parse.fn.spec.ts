import { safeParse } from './safe-parse.fn';

describe('SafeParse', () => {
	it('should handle null or undefined raw values', () => {
		const resultNull = safeParse(null);
		const resultUndefined = safeParse(undefined);

		expect(resultNull).toBeNull();
		expect(resultUndefined).toBeNull();
	});

	it('should handle primitive raw values', () => {
		const rawString = 'testString';
		const rawNumber = 42;
		const rawBoolean = true;

		const resultString = safeParse(rawString);
		const resultNumber = safeParse(rawNumber as any);
		const resultBoolean = safeParse(rawBoolean as any);

		expect(resultString).toBe(rawString);
		expect(resultNumber).toBe(rawNumber);
		expect(resultBoolean).toBe(rawBoolean);
	});
});
