import { invalidDiploma, validDiploma } from '../../mocks/diploma.mock';
import { isDiploma } from './diploma.type';

describe('diploma.type', () => {
	describe('isDiploma', () => {
		it('should return true for valid diploma type', () => {
			expect(isDiploma(validDiploma)).toBe(true);
		});

		it('should return false for invalid diploma type', () => {
			expect(isDiploma(invalidDiploma)).toBe(false);
		});
	});
	describe('diplomaSchema', () => {
		it('should validate a valid diploma object', () => {
			expect(isDiploma(validDiploma)).toBe(true);
		});

		it('should invalidate an invalid diploma object', () => {
			expect(isDiploma(invalidDiploma)).toBe(false);
		});
	});
});
