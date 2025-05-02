import { hasFields } from './has-field.fn';

describe('hasFields', () => {
	it('should return true if the object has a fields property', () => {
		expect(hasFields({ fields: [] })).toBe(true);
	});

	it('should return false if the object does not have a fields property', () => {
		expect(hasFields({ otherProperty: [] })).toBe(false);
	});

	it('should return false if the object is null or undefined', () => {
		expect(hasFields(null as any)).toBe(false);
		expect(hasFields(undefined as any)).toBe(false);
	});

	it('should return false if the object is an empty object', () => {
		expect(hasFields({})).toBe(false);
	});

	it('should return false if the object is an array', () => {
		expect(hasFields([{ id: 'field1' }, { id: 'field2' }] as any)).toBe(false);
	});
});
