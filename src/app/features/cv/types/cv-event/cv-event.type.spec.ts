import { cvEventSchema } from './cv-event.type';

describe('cvEventSchema', () => {
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
});
