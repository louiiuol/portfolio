import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
	let pipe: DurationPipe;

	beforeEach(() => {
		pipe = new DurationPipe();
	});

	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return "--" when time is null', () => {
		expect(pipe.transform(null)).toBe('--');
	});

	it('should return "--" when time is undefined', () => {
		expect(pipe.transform(undefined)).toBe('--');
	});

	it('should format duration correctly with minute as output unit', () => {
		const time = 4651000;
		const minOutput = 'minute';
		const compact = false;

		const result = pipe.transform(time, { minOutput, compact });

		expect(result).toBe('1 heure 17 minutes');
	});

	it('should use default parameters when optional arguments are not provided', () => {
		const time = 36000;
		const result = pipe.transform(time, { compact: true });

		expect(result).toBe('36s');
	});

	it('should handle negative time values correctly', () => {
		const time = -3600;
		const result = pipe.transform(time, { compact: true });

		expect(result).toBe('0s');
	});

	it('should handle very large time values correctly', () => {
		const time = 31536000000; // 1 year in milliseconds
		const minOutput = 'year';

		const result = pipe.transform(time, { minOutput });

		expect(result).toBe('1 an');
	});

	it('should format duration correctly with hours as output unit', () => {
		const time = 7200000; // 2 hours in milliseconds
		const minOutput = 'hour';

		const result = pipe.transform(time, { minOutput, compact: true });

		expect(result).toBe('2h');
	});

	it('should format duration correctly with days as output unit', () => {
		const time = 172800000; // 2 days in milliseconds
		const minOutput = 'day';

		const result = pipe.transform(time, { minOutput, compact: true });

		expect(result).toBe('2j');
	});

	it('should format duration correctly with compact set to false', () => {
		const time = 3600000; // 1 hour in milliseconds
		const minOutput = 'hour';
		const compact = false;

		const result = pipe.transform(time, { minOutput, compact });

		expect(result).toBe('1 heure');
	});

	it('should format duration correctly with compact set to true', () => {
		const time = 3600000; // 1 hour in milliseconds
		const minOutput = 'hour';
		const compact = true;

		const result = pipe.transform(time, { minOutput, compact });

		expect(result).toBe('1h');
	});

	it('should render below minOutput if time is', () => {
		const time = 5000; // 5 seconds in milliseconds
		const minOutput = 'minute';
		const compact = false;

		const result = pipe.transform(time, { minOutput, compact });

		expect(result).toBe('5 secondes');
	});
});
