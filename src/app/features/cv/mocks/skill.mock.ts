import type { Skill } from '../types';

export const validSkill: Skill = {
	name: 'Test Skill',
	description: 'This is a test skill',
	level: 'expert',
};

export const invalidSkill = {
	name: 'Invalid Skill',
	level: 'not-a-level', // Invalid level
};
