import { formatDuration } from './format-duration.fn';

describe('formatDuration', () => {
	it('should return "0 seconde" for 0 milliseconds', () => {
		expect(formatDuration(0, {})).toBe('0 seconde');
	});

	it('should return "0 seconde" for negative milliseconds', () => {
		expect(formatDuration(-1000, {})).toBe('0 seconde');
	});

	it('should format milliseconds into seconds', () => {
		expect(formatDuration(1000, {})).toBe('1 seconde');
	});

	it('should format milliseconds into minutes and seconds', () => {
		expect(formatDuration(65000, {})).toBe('1 minute 5 secondes');
	});

	it('should format milliseconds into hours, minutes, and seconds', () => {
		expect(formatDuration(3661000, {})).toBe('1 heure 1 minute 1 seconde');
	});

	it('should use compact labels when compact option is true', () => {
		expect(formatDuration(3661000, { compact: true })).toBe('1h 1min 1s');
	});

	it('should stop formatting at the specified output unit', () => {
		expect(formatDuration(3661000, { outputUnit: 'minute' })).toBe(
			'61 minutes'
		);
	});

	it('should handle fractional milliseconds correctly', () => {
		expect(formatDuration(1500, { outputUnit: 'second' })).toBe('1 seconde');
	});

	it('should handle large durations correctly', () => {
		const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
		expect(formatDuration(oneYearInMs, {})).toBe('1 an');
	});

	it('should handle zero duration with compact option', () => {
		expect(formatDuration(0, { compact: true })).toBe('0s');
	});

	it('should handle durations less than a second', () => {
		expect(formatDuration(500, {})).toBe('500 millisecondes');
	});

	it('should use the provided separator', () => {
		expect(formatDuration(3661000, { separator: ', ' })).toBe(
			'1 heure, 1 minute, 1 seconde'
		);
	});

	it('should handle edge case where duration is exactly 1 unit', () => {
		expect(formatDuration(60000, {})).toBe('1 minute');
	});

	it('should handle edge case where duration is just below 1 unit', () => {
		expect(formatDuration(59999, { outputUnit: 'second' })).toBe('59 secondes');
	});

	it('should limit the number of units displayed to maxUnits', () => {
		expect(formatDuration(3661000, { maxUnits: 2 })).toBe('1 heure 1 minute');
		expect(formatDuration(3661000, { maxUnits: 1 })).toBe('1 heure');
		expect(formatDuration(3661000, { maxUnits: 3 })).toBe(
			'1 heure 1 minute 1 seconde'
		);
	});

	it('should handle maxUnits with outputUnit', () => {
		expect(formatDuration(3661000, { maxUnits: 2, outputUnit: 'minute' })).toBe(
			'61 minutes'
		);
		expect(formatDuration(3661000, { maxUnits: 1, outputUnit: 'minute' })).toBe(
			'61 minutes'
		);
	});

	it('should use default parameters when optional arguments are not provided', () => {
		const time = 36000;
		const result = formatDuration(time, { compact: true });

		expect(result).toBe('36s');
	});

	it('should render as seated outputUnit, even if value is lower', () => {
		const time = 3600;
		const result = formatDuration(time, { outputUnit: 'hour' });

		expect(result).toBe('0 heure');
	});
});
