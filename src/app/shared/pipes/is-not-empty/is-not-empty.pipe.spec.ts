import { IsNotEmptyPipe } from './is-not-empty.pipe';

describe('IsNotEmptyPipe', () => {
	let pipe: IsNotEmptyPipe;

	beforeEach(() => {
		pipe = new IsNotEmptyPipe();
	});

	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return true for non-empty objects', () => {
		const obj = { key: 'value' };

		expect(pipe.transform(obj)).toBeTrue();
	});

	it('should return false for empty objects', () => {
		const obj = {};

		expect(pipe.transform(obj)).toBeFalse();
	});
});
