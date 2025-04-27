import { sleep } from './sleep.fn';

describe('sleep function', () => {
	it('should resolve after the specified time', done => {
		const start = Date.now();
		const delay = 100;

		sleep(delay).then(() => {
			const elapsed = Date.now() - start;
			expect(elapsed).toBeGreaterThanOrEqual(delay);
			done();
		});
	});

	it('should resolve without throwing an error', async () => {
		await expectAsync(sleep(50)).toBeResolved();
	});
});
