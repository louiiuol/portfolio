import { validSkill } from '../../mocks/skill.mock';
import { isSkill, skillSchema } from './skill.type';

describe('skill', () => {
	describe('isSkill', () => {
		it('should return true for valid skill type', () => {
			expect(isSkill(validSkill)).toBe(true);
		});

		it('should return false for invalid skill type', () => {
			expect(isSkill({ ...validSkill, name: null })).toBe(false);
		});
	});

	describe('skillSchema', () => {
		it('should validate a valid skill object', () => {
			expect(skillSchema.safeParse(validSkill).success).toBe(true);
		});

		it('should invalidate an invalid skill object', () => {
			expect(skillSchema.safeParse({ ...validSkill, name: null }).success).toBe(
				false
			);
		});
	});
});
