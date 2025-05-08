import { validJobInput } from '../../mocks/job.mock';
import { isJobInput, jobSchema } from './job.type';

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

	describe('isJobInput', () => {
		it('should correctly identify a valid JobInput using isJobInput', () => {
			expect(isJobInput(validJobInput())).toBe(true);
		});

		it('should correctly reject an invalid JobInput using isJobInput', () => {
			const invalidJobInput = { ...validJobInput(), title: 123 };
			expect(isJobInput(invalidJobInput)).toBe(false);
		});
	});
});
