import { validTrainingInput } from '../../mocks';
import { trainingSchema } from './training.type';

describe('Training schema', () => {
	it('should validate a valid TrainingEntry using trainingSchema', () => {
		expect(() => trainingSchema.parse(validTrainingInput())).not.toThrow();
	});

	it('should throw an error for invalid TrainingEntry using trainingSchema', () => {
		const invalidEntry = { ...validTrainingInput(), name: 123 }; // Invalid name type
		expect(() => trainingSchema.parse(invalidEntry)).toThrow();
	});

	it('should throw an error for invalid date formats', () => {
		const invalidEntry = { ...validTrainingInput(), startDate: 'not-a-date' };
		expect(() => trainingSchema.parse(invalidEntry)).toThrow();
	});

	it('should throw an error for invalid diplomas array', () => {
		const invalidEntry = { ...validTrainingInput(), diplomas: 'not-an-array' };
		expect(() => trainingSchema.parse(invalidEntry)).toThrow();
	});

	it('should throw an error for invalid school data', () => {
		const invalidEntry = { ...validTrainingInput(), school: null };
		expect(() => trainingSchema.parse(invalidEntry)).toThrow();
	});
});
