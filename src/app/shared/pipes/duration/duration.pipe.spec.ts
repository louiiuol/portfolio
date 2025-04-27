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

	it('should call formatDuration with correct parameters', () => {
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
});
