import { validPlace } from '../../mocks/place.mock';
import { isPlace, placeSchema } from './place.type';

describe('place.type', () => {
	describe('placeSchema', () => {
		it('should validate a valid place object', () => {
			expect(placeSchema.safeParse(validPlace).success).toBe(true);
		});

		it('should invalidate an invalid place object', () => {
			expect(placeSchema.safeParse({ ...validPlace, city: null }).success).toBe(
				false
			);
		});
	});

	describe('isPlace', () => {
		it('should return true for valid place type', () => {
			expect(isPlace(validPlace)).toBe(true);
		});

		it('should return false for invalid place type', () => {
			expect(isPlace({ ...validPlace, city: null })).toBe(false);
		});
	});
});
