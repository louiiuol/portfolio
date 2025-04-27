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
		const time = 3604000;
		const outputUnit = 'minute';
		const compact = false;
		const separator = ', ';

		const result = pipe.transform(time, outputUnit, compact, separator);

		expect(result).toBe('60 minutes');
	});

	it('should use default parameters when optional arguments are not provided', () => {
		const time = 36000;
		const result = pipe.transform(time);

		expect(result).toBe('36s');
	});

	it('should handle negative time values correctly', () => {
		const time = -3600;
		const result = pipe.transform(time);

		expect(result).toBe('0s');
	});

	it('should handle very large time values correctly', () => {
		const time = 31536000000; // 1 year in milliseconds
		const outputUnit = 'day';

		const result = pipe.transform(time, outputUnit);

		expect(result).toBe('365j');
	});

	it('should format duration correctly with hours as output unit', () => {
		const time = 7200000; // 2 hours in milliseconds
		const outputUnit = 'hour';

		const result = pipe.transform(time, outputUnit);

		expect(result).toBe('2h');
	});

	it('should format duration correctly with days as output unit', () => {
		const time = 172800000; // 2 days in milliseconds
		const outputUnit = 'day';

		const result = pipe.transform(time, outputUnit);

		expect(result).toBe('2j');
	});

	it('should format duration correctly with compact set to false', () => {
		const time = 3600000; // 1 hour in milliseconds
		const outputUnit = 'hour';
		const compact = false;

		const result = pipe.transform(time, outputUnit, compact);

		expect(result).toBe('1 heure');
	});

	it('should format duration correctly with compact set to true', () => {
		const time = 10; // 1 hour in milliseconds
		const outputUnit = 'day';
		const compact = true;

		const result = pipe.transform(time, outputUnit, compact);

		expect(result).toBe('0j');
	});
});
