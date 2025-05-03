import { invalidPlace, validPlace } from '../../mocks/place.mock';
import { isPlace, placeSchema } from './place.type';

describe('place.type', () => {
	describe('placeSchema', () => {
		it('should validate a valid place object', () => {
			expect(placeSchema.safeParse(validPlace).success).toBe(true);
		});

		it('should invalidate an invalid place object', () => {
			expect(placeSchema.safeParse(invalidPlace).success).toBe(false);
		});
	});

	describe('isPlace', () => {
		it('should return true for valid place type', () => {
			expect(isPlace(validPlace)).toBe(true);
		});

		it('should return false for invalid place type', () => {
			expect(placeSchema.safeParse(invalidPlace).success).toBe(false);
		});
	});
});
