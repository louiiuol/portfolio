import { isEmpty } from './is-empty.fn';

describe('isEmpty', () => {
	it('should return true for an empty object', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('should return false for an object with properties', () => {
		expect(isEmpty({ key: 'value' })).toBe(false);
	});

	it('should return true for null', () => {
		expect(isEmpty(null as unknown as object)).toBe(true);
	});

	it('should return true for undefined', () => {
		expect(isEmpty(undefined as unknown as object)).toBe(true);
	});

	it('should return false for an object with inherited properties', () => {
		const parent = { inheritedKey: 'value' };
		const child = Object.create(parent);
		expect(isEmpty(child)).toBe(true);
	});

	it('should return true for an object with no own properties', () => {
		const obj = Object.create(null);
		expect(isEmpty(obj)).toBe(true);
	});
});
