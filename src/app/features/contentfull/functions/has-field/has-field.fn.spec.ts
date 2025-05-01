import { hasFields } from './has-field.fn';

describe('hasFields', () => {
	it('should return true if the object has a fields property', () => {
		const obj = { fields: [] };
		expect(hasFields(obj)).toBe(true);
	});

	it('should return false if the object does not have a fields property', () => {
		const obj = { otherProperty: [] };
		expect(hasFields(obj)).toBe(false);
	});

	it('should return false if the object is null or undefined', () => {
		expect(hasFields(null as any)).toBe(false);
		expect(hasFields(undefined as any)).toBe(false);
	});

	it('should return false if the object is an empty object', () => {
		const obj = {};
		expect(hasFields(obj)).toBe(false);
	});

	it('should return false if the object is an array', () => {
		const obj = ['field1', 'field2'];
		expect(hasFields(obj as any)).toBe(false);
	});
});
