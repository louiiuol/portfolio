import type { Training } from '../types';
import type { TrainingEntry } from '../types/training/training.type';
import { validDiploma } from './diploma.mock';
import { validPlace } from './place.mock';

export const validTraining: Training = {
	id: '1',
	name: 'Test Training',
	description: 'This is a test training',
	startDate: new Date('2023-01-01'),
	endDate: new Date('2023-12-31'),
	skills: [],
	location: validPlace,
	diplomas: [validDiploma],
	type: 'Formation',
};

export const validTrainingInput: TrainingEntry = {
	id: '1',
	name: 'Test Training',
	description: 'This is a test training',
	startDate: new Date('2023-01-01'),
	endDate: new Date('2023-12-31'),
	school: validPlace,
	diplomas: [validDiploma],
};
