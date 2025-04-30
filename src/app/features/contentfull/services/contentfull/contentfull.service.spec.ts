import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@shared/services';

import { effect } from '@angular/core';
import { RichTextService } from '../rich-text/rich-text.service';
import { ContentfullService } from './contentfull.service';

describe('ContentfullService', () => {
	let service: ContentfullService;
	let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
	let richTextServiceSpy: jasmine.SpyObj<RichTextService>;

	beforeEach(() => {
		const localStorageSpy = jasmine.createSpyObj('LocalStorageService', [
			'get',
			'set',
		]);
		const richTextSpy = jasmine.createSpyObj('RichTextService', [
			'processRichTextNodes',
		]);

		TestBed.configureTestingModule({
			providers: [
				ContentfullService,
				{ provide: LocalStorageService, useValue: localStorageSpy },
				{ provide: RichTextService, useValue: richTextSpy },
			],
		});

		service = TestBed.inject(ContentfullService);
		localStorageServiceSpy = TestBed.inject(
			LocalStorageService
		) as jasmine.SpyObj<LocalStorageService>;
		richTextServiceSpy = TestBed.inject(
			RichTextService
		) as jasmine.SpyObj<RichTextService>;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set local entries in localStorage', () => {
		const mockEntries = {
			exprience: [],
			skill: [],
			company: [],
			school: [],
			diploma: [],
			training: [],
		};
		service['setLocalEntries'](mockEntries);
		expect(localStorageServiceSpy.set).toHaveBeenCalledWith(
			service['localStorageKey'],
			jasmine.objectContaining(mockEntries)
		);
	});

	it('should get local entries from localStorage if not expired', () => {
		const mockEntries = {
			exprience: [],
			skill: [],
			company: [],
			school: [],
			diploma: [],
			training: [],
			updatedAt: new Date(),
		};
		localStorageServiceSpy.get.and.returnValue(mockEntries);

		const result = service['getLocalEntries']();
		expect(result).toEqual(mockEntries);
	});

	it('should return null if local entries are expired', () => {
		const expiredEntries = {
			exprience: [],
			skill: [],
			company: [],
			school: [],
			diploma: [],
			training: [],
			updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
		};
		localStorageServiceSpy.get.and.returnValue(expiredEntries);

		const result = service['getLocalEntries']();
		expect(result).toBeNull();
	});

	it('should process an entry with fields', () => {
		const mockEntry = { fields: { name: 'Test' } };
		const result = service['processEntry'](mockEntry);
		expect(result).toEqual({ name: 'Test' });
	});

	it('should process an entry with rich text', () => {
		const mockRichText = { content: [], nodeType: 'document' };
		richTextServiceSpy.processRichTextNodes.and.returnValue(
			'Processed Rich Text' as any
		);

		const result = service['processEntry'](mockRichText);
		expect(result).toEqual('Processed Rich Text');
	});

	it('should process an object entry', () => {
		const mockObject = { key1: 'value1', key2: 'value2' };
		const result = service['processObject'](mockObject);
		expect(result).toEqual(mockObject);
	});

	it('should load content resource and return entries', async () => {
		const mockEntries = {
			exprience: [],
			skill: [],
			company: [],
			school: [],
			diploma: [],
			training: [],
		};
		spyOn(service['cdaClient'], 'getEntries').and.returnValue(
			Promise.resolve({ items: [] } as any)
		);
		spyOn<any>(service, 'getLocalEntries').and.returnValue(null);
		spyOn<any>(service, 'setLocalEntries');

		let result: any;

		effect(() => {
			const value = service.contentResource.value();
			if (value !== null) {
				result = value;
			}
		});

		// Attend que la Promise interne se résolve
		await new Promise(resolve => setTimeout(resolve, 0));

		expect(result).toEqual(mockEntries);
		expect(service['setLocalEntries']).toHaveBeenCalledWith(mockEntries);
	});

	it('should process entry if found an array', () => {
		const mockEntry = {
			fields: {
				name: 'Test',
				items: [{ fields: { name: 'Item 1' } }, { fields: { name: 'Item 2' } }],
			},
		};
		const result = service['processEntry'](mockEntry);
		expect(result).toEqual({
			name: 'Test',
			items: [{ name: 'Item 1' }, { name: 'Item 2' }],
		});
	});

	it('should get local entries from localStorage if not expired', () => {
		const mockEntries = {
			exprience: [],
			skill: [],
			company: [],
			school: [],
			diploma: [],
			training: [],
			updatedAt: new Date(),
		};
		localStorageServiceSpy.get.and.returnValue(mockEntries);

		const result = service['getLocalEntries']();
		expect(result).toEqual(mockEntries);
	});
});
