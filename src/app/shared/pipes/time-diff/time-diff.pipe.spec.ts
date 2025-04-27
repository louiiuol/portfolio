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
		expect(result).toBe('-3 mois');
	});

	it('should calculate the difference in days when outputUnit is "day"', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-01-10');
		const result = pipe.transform({ startDate, endDate }, 'day');
		expect(result).toBe('-9 jours');
	});

	it('should use the current date if endDate is not provided', () => {
		const startDate = new Date('2023-01-01');
		const now = new Date('2023-02-15');
		jasmine.clock().mockDate(now);

		const result = pipe.transform({ startDate }, 'day');
		const expectedDiff = Math.floor(
			(now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		);
		const expectedResult = `-${expectedDiff} jours`;

		expect(result).toBe(expectedResult);
		jasmine.clock().uninstall();
	});

	it('should return a compact string when compact is true', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-04-01');
		const result = pipe.transform({ startDate, endDate }, 'month', true);
		expect(result).toBe('-3m');
	});

	it('should calculate the difference in years for large time differences', () => {
		const startDate = new Date('2000-01-01');
		const endDate = new Date('2023-01-01');
		const result = pipe.transform({ startDate, endDate }, 'year');
		expect(result).toBe('-23 ans');
	});

	it('should return "0" for zero time difference', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-01-01');
		const result = pipe.transform({ startDate, endDate }, 'second');
		expect(result).toBe('0 seconde');
	});

	it("shouldn't handle negative time differences => returns 0", () => {
		const startDate = new Date('2023-04-01');
		const endDate = new Date('2023-01-01');
		const result = pipe.transform({ startDate, endDate }, 'month');
		expect(result).toBe('3 mois');
	});

	it('should return a compact format for years when compact is true', () => {
		const startDate = new Date('2000-01-01');
		const endDate = new Date('2023-01-01');
		const result = pipe.transform({ startDate, endDate }, 'year', true);
		expect(result).toBe('-23an');
	});

	it('should return a compact format for days when compact is true', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2023-01-10');
		const result = pipe.transform({ startDate, endDate }, 'day', true);
		expect(result).toBe('-9j');
	});

	it('should return "--" for invalid startDate', () => {
		const result = pipe.transform({ startDate: null as any }, 'day');
		expect(result).toBe('--');
	});

	it('should return "--" for invalid endDate', () => {
		const startDate = new Date('2023-01-01');
		const result = pipe.transform(
			{ startDate, endDate: 'invalid-date' as any },
			'day'
		);
		expect(result).toBe('--');
	});

	it('should return "--" for both invalid startDate and endDate', () => {
		const result = pipe.transform(
			{ startDate: 'invalid-date' as any, endDate: 'invalid-date' as any },
			'day'
		);
		expect(result).toBe('--');
	});
});
