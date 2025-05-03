import { validDiploma } from '../../mocks/diploma.mock';
import { diplomaSchema, isDiploma } from './diploma.type';

describe('diploma.type', () => {
	describe('isDiploma', () => {
		it('should return true for valid diploma type', () => {
			expect(isDiploma(validDiploma)).toBe(true);
		});

		it('should return false for invalid diploma type', () => {
			expect(isDiploma({ ...validDiploma, skills: null })).toBe(false);
		});
	});

	describe('diplomaSchema', () => {
		it('should validate a valid diploma object', () => {
			expect(diplomaSchema.safeParse(validDiploma).success).toBe(true);
		});

		it('should invalidate an invalid diploma object', () => {
			expect(
				diplomaSchema.safeParse({ ...validDiploma, skills: null }).success
			).toBe(false);
		});
	});
});
