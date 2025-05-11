import { validDiploma, validTrainingInput } from '@feat/contentful/mocks';
import type { TrainingEntry } from '@feat/contentful/types';
import { Training, isTraining } from './training.type';

describe('Training', () => {
	it('should create a Training instance with valid input', () => {
		const training = new Training(validTrainingInput());
		expect(training.name).toBe(validTrainingInput().name);
		expect(training.description).toBe(validTrainingInput().description);
		expect(training.location).toEqual(validTrainingInput().school);
		expect(training.diplomas).toEqual(validTrainingInput().diplomas);
		expect(training.skills).toEqual(validDiploma.skills);
		expect(training.type).toBe('Formation');
	});

	it('should deduplicate skills in the Training instance', () => {
		const entryWithDuplicateSkills: TrainingEntry = {
			...validTrainingInput(),
			diplomas: [
				{
					name: 'Diploma 1',
					description: 'Description 1',
					obtainedAt: new Date('2023-01-01'),
					skills: [
						{ name: 'JavaScript', level: 'avancé' },
						{ name: 'React', level: 'avancé' },
					],
				},
				{
					name: 'Diploma 2',
					description: 'Description 1',
					obtainedAt: new Date('2023-01-01'),
					skills: [
						{ name: 'JavaScript', level: 'avancé' },
						{ name: 'TypeScript', level: 'avancé' },
					],
				},
			],
		};
		const training = new Training(entryWithDuplicateSkills);
		expect(training.skills).toEqual([
			{ name: 'JavaScript', level: 'avancé' },
			{ name: 'React', level: 'avancé' },
			{ name: 'TypeScript', level: 'avancé' },
		]);
	});

	// @todo add proper logic to handle this case
	xit('should handle skills with same name but different levels during deduplication', () => {
		const entryWithConflictingSkills: TrainingEntry = {
			...validTrainingInput(),
			diplomas: [
				{
					name: 'Diploma 1',
					description: 'Description 1',
					obtainedAt: new Date('2023-01-01'),
					skills: [{ name: 'JavaScript', level: 'avancé' }],
				},
				{
					name: 'Diploma 2',
					description: 'Description 2',
					obtainedAt: new Date('2023-02-01'),
					skills: [{ name: 'JavaScript', level: 'expert' }],
				},
			],
		};
		const training = new Training(entryWithConflictingSkills);
		// Verify which level is kept or how the conflict is resolved
		expect(training.skills).toEqual([
			{ name: 'JavaScript', level: 'expert' }, // Or however the implementation resolves this
		]);
	});

	it('should correctly identify a Training instance using isTraining', () => {
		const training = new Training(validTrainingInput());
		expect(isTraining(training)).toBe(true);
	});

	it('should return false for non-Training instances using isTraining', () => {
		const nonTraining = { ...validTrainingInput(), type: 'OtherType' };
		expect(isTraining(nonTraining)).toBe(false);
	});
});
