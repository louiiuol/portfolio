import { validDiploma } from '../../mocks/diploma.mock';
import { diplomaSchema } from './diploma.type';

describe('diploma.type', () => {
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
