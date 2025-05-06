import { validPlace } from '../../mocks/place.mock';
import { placeSchema } from './place.type';

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
});
