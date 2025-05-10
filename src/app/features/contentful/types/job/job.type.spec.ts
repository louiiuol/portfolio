import { validJobInput } from '../../mocks/job.mock';
import { jobSchema } from './job.type';

describe('Job Type', () => {
	describe('jobSchema', () => {
		it('should validate a valid JobInput', () => {
			expect(() => jobSchema.parse(validJobInput())).not.toThrow();
		});

		it('should invalidate an invalid JobInput', () => {
			const invalidJobInput = {
				...validJobInput(),
				remotePolicy: 'invalid-policy',
			};
			expect(() => jobSchema.parse(invalidJobInput)).toThrow();
		});
	});
});
