import type { Diploma } from '../types';

export const validDiploma: Diploma = {
	name: 'Test Diploma',
	description: 'This is a test diploma',
	obtainedAt: new Date(),
	skills: [
		{
			name: 'Test Skill',
			description: 'This is a test skill',
			level: 'expert',
		},
	],
};
