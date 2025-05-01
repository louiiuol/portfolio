import { sleep } from './sleep.fn';

describe('sleep function', () => {
	it('should resolve after the specified time', async () => {
		const start = Date.now();
		const delay = 100;

		await sleep(delay).then(() => {
			const elapsed = Date.now() - start;
			expect(elapsed).toBeGreaterThanOrEqual(delay);
		});
	});

	it('should resolve without throwing an error', async () => {
		await expectAsync(sleep(50)).toBeResolved();
	});
});
