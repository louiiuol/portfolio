import type { Training } from '../types';
import type { TrainingEntry } from '../types/training/training.type';
import { validDiploma } from './diploma.mock';
import { invalidPlace, validPlace } from './place.mock';

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

// Missing required fields
// Invalid types for startDate and endDate
// Invalid location
export const invalidTraining = {
	id: '2',
	name: 'Invalid Training',
	description: 'This is an invalid training',
	startDate: 'not-a-date',
	endDate: 'not-a-date',
	skills: [],
	location: invalidPlace,
	diplomas: [validDiploma],
	type: 'Formation',
};
