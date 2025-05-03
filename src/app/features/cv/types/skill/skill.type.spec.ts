import { invalidSkill, validSkill } from '../../mocks/skill.mock';
import { isSkill } from './skill.type';

describe('skill', () => {
	describe('isSkill', () => {
		it('should return true for valid skill type', () => {
			expect(isSkill(validSkill)).toBe(true);
		});

		it('should return false for invalid skill type', () => {
			expect(isSkill(invalidSkill)).toBe(false);
		});
	});

	describe('skillSchema', () => {
		it('should validate a valid skill object', () => {
			expect(isSkill(validSkill)).toBe(true);
		});

		it('should invalidate an invalid skill object', () => {
			expect(isSkill(invalidSkill)).toBe(false);
		});
	});
});
