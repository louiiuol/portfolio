import { isNotNullish, isNullish } from './nullish.type';

describe('nullish.type', () => {
	describe('isNullish', () => {
		it('should return true for null', () => {
			expect(isNullish(null)).toBe(true);
		});

		it('should return true for undefined', () => {
			expect(isNullish(undefined)).toBe(true);
		});

		it('should return false for non-nullish values', () => {
			expect(isNullish(0)).toBe(false);
			expect(isNullish('')).toBe(false);
			expect(isNullish(false)).toBe(false);
			expect(isNullish({})).toBe(false);
			expect(isNullish([])).toBe(false);
		});
	});

	describe('isNotNullish', () => {
		it('should return false for null', () => {
			expect(isNotNullish(null)).toBe(false);
		});

		it('should return false for undefined', () => {
			expect(isNotNullish(undefined)).toBe(false);
		});

		it('should return true for non-nullish values', () => {
			expect(isNotNullish(0)).toBe(true);
			expect(isNotNullish('')).toBe(true);
			expect(isNotNullish(false)).toBe(true);
			expect(isNotNullish({})).toBe(true);
			expect(isNotNullish([])).toBe(true);
		});
	});
});
