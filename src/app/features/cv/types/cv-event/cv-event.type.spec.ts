import { validCvEventInput } from '../../mocks/cv-event.mock';
import { cvEventSchema } from './cv-event.type';

describe('cvEventSchema', () => {
	xit('should validate a valid CvEvent object', () => {
		expect(() => cvEventSchema.parse(validCvEventInput('job'))).not.toThrow();
		expect(() =>
			cvEventSchema.parse(validCvEventInput('training'))
		).not.toThrow();
	});

	it('should fail validation if required fields are missing', () => {
		const invalidCvEvent = {
			name: 'Software Engineer',
			description: 'Developed software solutions',
			type: 'job',
		};

		expect(() => cvEventSchema.parse(invalidCvEvent)).toThrow();
	});

	it('should fail validation if dates are invalid', () => {
		const invalidCvEvent = {
			id: '123',
			name: 'Software Engineer',
			description: 'Developed software solutions',
			type: 'job',
			startDate: 'invalid-date',
			endDate: 'invalid-date',
			location: {
				name: 'Company HQ',
				address: '123 Main St',
			},
			skills: [
				{ name: 'TypeScript', level: 'advanced' },
				{ name: 'React', level: 'intermediate' },
			],
		};

		expect(() => cvEventSchema.parse(invalidCvEvent)).toThrow();
	});

	it('should validate location using placeSchema', () => {
		const invalidCvEvent = {
			id: '123',
			name: 'Software Engineer',
			description: 'Developed software solutions',
			type: 'job',
			startDate: new Date('2020-01-01'),
			endDate: new Date('2022-01-01'),
			location: {
				name: '',
				address: '',
			},
			skills: [
				{ name: 'TypeScript', level: 'advanced' },
				{ name: 'React', level: 'intermediate' },
			],
		};

		expect(() => cvEventSchema.parse(invalidCvEvent)).toThrow();
	});

	it('should validate skills using skillSchema', () => {
		const invalidCvEvent = {
			id: '123',
			name: 'Software Engineer',
			description: 'Developed software solutions',
			type: 'job',
			startDate: new Date('2020-01-01'),
			endDate: new Date('2022-01-01'),
			location: {
				name: 'Company HQ',
				address: '123 Main St',
			},
			skills: [
				{ name: '', level: 'advanced' },
				{ name: 'React', level: '' },
			],
		};

		expect(() => cvEventSchema.parse(invalidCvEvent)).toThrow();
	});
});
