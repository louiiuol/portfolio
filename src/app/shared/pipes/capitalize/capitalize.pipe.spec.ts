import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
	let pipe: CapitalizePipe;

	beforeEach(() => {
		pipe = new CapitalizePipe();
	});

	it('should capitalize the first letter of a lowercase string', () => {
		const result = pipe.transform('hello');
		expect(result).toBe('Hello');
	});

	it('should capitalize the first letter of an uppercase string', () => {
		const result = pipe.transform('Hello');
		expect(result).toBe('Hello');
	});

	it('should return "--" for null value', () => {
		const result = pipe.transform(null);
		expect(result).toBe('--');
	});

	it('should return "--" for undefined value', () => {
		const result = pipe.transform(undefined);
		expect(result).toBe('--');
	});

	it('should return "--" for an empty string', () => {
		const result = pipe.transform('');
		expect(result).toBe('--');
	});

	it('should handle strings with only one character', () => {
		const result = pipe.transform('a');
		expect(result).toBe('A');
	});

	it('should handle strings with special characters', () => {
		const result = pipe.transform('!hello');
		expect(result).toBe('!hello');
	});

	it('should handle strings with spaces', () => {
		const result = pipe.transform(' hello');
		expect(result).toBe(' hello');
	});
});
