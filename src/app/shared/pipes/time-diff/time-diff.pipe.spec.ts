import { TimeDifferencePipe } from './time-diff.pipe';

describe('TimeDifferencePipe', () => {
	let pipe: TimeDifferencePipe;

	beforeEach(() => {
		pipe = new TimeDifferencePipe();
	});

	it('should calculate the difference in months between two dates', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-04-01');

		const result = pipe.transform({ startDate, endDate }, 'month');
		expect(result).toBe('3 mois');
	});

	it('should calculate the difference in days when outputUnit is "day"', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-01-10');
		const result = pipe.transform({ startDate, endDate }, 'day');
		expect(result).toBe('9 jours');
	});

	it('should use the current date if endDate is not provided', () => {
		const startDate = new Date('2023-01-01');
		const now = new Date();

		const result = pipe.transform({ startDate }, 'day');
		const expectedDiff = Math.floor(
			(now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		);
		const expectedResult = `${expectedDiff} jours`;

		expect(result).toBe(expectedResult);
	});

	it('should return a compact string when compact is true', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-04-01');
		const result = pipe.transform({ startDate, endDate }, 'month', true);
		expect(result).toBe('3m');
	});
});
