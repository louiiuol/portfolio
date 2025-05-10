import { validJobInput } from '@feat/contentful/mocks/job.mock';
import { jobSchema } from '@feat/contentful/types';
import { isJob, Job, validJob } from './job.type';

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

	describe('isJob', () => {
		it('should correctly identify a valid JobInput using isJob', () => {
			expect(isJob(validJob)).toBe(true);
		});

		it('should correctly reject an invalid JobInput using isJob', () => {
			const invalidJobInput = { ...validJob, name: null };
			expect(isJob(invalidJobInput)).toBe(false);
		});
	});

	describe('Job', () => {
		it('should create a Job instance from valid JobInput', () => {
			const job = new Job(validJobInput());
			expect(job).toBeInstanceOf(Job);
			expect(job.name).toBe(validJobInput().title);
			expect(job.description).toBe(validJobInput().summary);
			expect(job.remotePolicy).toBe(validJobInput().remotePolicy);
		});

		it('should correctly identify a valid Job instance using isJob', () => {
			const job = new Job(validJobInput());
			expect(isJob(job)).toBe(true);
		});

		it('should correctly reject an invalid Job instance using isJob', () => {
			const invalidJob = { ...validJobInput(), type: 'invalid-type' };
			expect(isJob(invalidJob)).toBe(false);
		});
	});
});
