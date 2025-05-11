import type { DiplomaEntry } from '../types';

export const validDiploma: DiplomaEntry = {
	id: 'Diploma1',
	name: 'Test Diploma',
	description: 'This is a test diploma',
	obtainedAt: new Date(),
	skills: [
		{
			id: 'skill-1',
			name: 'Test Skill',
			description: 'This is a test skill',
			level: 'expert',
		},
	],
};
