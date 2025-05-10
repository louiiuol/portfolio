import type { DiplomaEntry } from '../types';

export const validDiploma: DiplomaEntry = {
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
