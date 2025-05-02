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

	it('should not resolve before the specified time', async () => {
		const start = Date.now();
		const delay = 100;

		await sleep(delay - 50).then(() => {
			const elapsed = Date.now() - start;
			expect(elapsed).toBeLessThan(delay);
		});
	});

	it('should handle zero delay', async () => {
		const start = Date.now();
		await sleep(0).then(() => {
			const elapsed = Date.now() - start;
			expect(elapsed).toBeLessThan(10); // Allow a small margin for the execution time
		});
	});

	it('should handle negative delay', async () => {
		const start = Date.now();
		await sleep(-100).then(() => {
			const elapsed = Date.now() - start;
			expect(elapsed).toBeLessThan(10); // Allow a small margin for the execution time
		});
	});
});
