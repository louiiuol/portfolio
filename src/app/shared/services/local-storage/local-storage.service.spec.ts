import { TestBed } from '@angular/core/testing';
import { z } from 'zod';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
	let service: LocalStorageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(LocalStorageService);
		localStorage.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set and get a primitive value', () => {
		const key = 'testKey';
		const value = 'testValue';
		const schema = z.string();

		service.set(key, value);
		const result = service.get(key, schema);

		expect(result).toBe(value);
	});

	it('should set and get an object', () => {
		const key = 'testObject';
		const value = { name: 'John', age: 30 };
		const schema = z.object({ name: z.string(), age: z.number() });

		service.set(key, value);
		const result = service.get(key, schema);

		expect(result).toEqual(value);
	});

	it('should return null if the key does not exist', () => {
		const key = 'nonExistentKey';
		const schema = z.string();

		const result = service.get(key, schema);

		expect(result).toBeNull();
	});

	it('should return null if the value does not match the schema', () => {
		const key = 'invalidSchema';
		const value = { name: 'John', age: 'thirty' }; // Invalid age type
		const schema = z.object({ name: z.string(), age: z.number() });

		service.set(key, value);
		const result = service.get(key, schema);

		expect(result).toBeNull();
	});

	it('should check if a key exists', () => {
		const key = 'existingKey';
		const value = 'value';

		service.set(key, value);

		expect(service.check(key)).toBeTrue();
		expect(service.check('nonExistingKey')).toBeFalse();
	});

	it('should remove a key', () => {
		const key = 'keyToRemove';
		const value = 'value';

		service.set(key, value);
		service.remove(key);

		expect(service.check(key)).toBeFalse();
	});

	it('should handle invalid JSON gracefully', () => {
		const key = 'invalidJson';
		localStorage.setItem(key, '{invalidJson}');
		const schema = z.object({});

		const result = service.get(key, schema);

		expect(result).toBeNull();
	});

	it('should handle null or undefined raw values in safeParseRaw', () => {
		const resultNull = (service as any).safeParseRaw(null);
		const resultUndefined = (service as any).safeParseRaw(undefined);

		expect(resultNull).toBeNull();
		expect(resultUndefined).toBeNull();
	});

	it('should handle primitive raw values in safeParseRaw', () => {
		const rawString = 'testString';
		const rawNumber = 42;
		const rawBoolean = true;

		const resultString = (service as any).safeParseRaw(rawString);
		const resultNumber = (service as any).safeParseRaw(rawNumber);
		const resultBoolean = (service as any).safeParseRaw(rawBoolean);

		expect(resultString).toBe(rawString);
		expect(resultNumber).toBe(rawNumber);
		expect(resultBoolean).toBe(rawBoolean);
	});
});
