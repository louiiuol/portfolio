import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@shared/services';

import { RichTextService } from '../rich-text/rich-text.service';
import { ContentfullService } from './contentfull.service';

const mockEntries = {
	exprience: [],
	skill: [],
	company: [],
	school: [],
	diploma: [],
	training: [],
};

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
			...mockEntries,
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

	// xit('should load content resource and return entries', async () => {
	// 	spyOn(service['cdaClient'], 'getEntries').and.returnValue(
	// 		Promise.resolve({ items: [] } as any)
	// 	);
	// 	spyOn<any>(service, 'getLocalEntries').and.returnValue(null);
	// 	spyOn<any>(service, 'setLocalEntries');

	// 	const injector = TestBed.inject(Injector);

	// 	let result: any;

	// 	await new Promise<void>(resolve => {
	// 		runInInjectionContext(injector, () => {
	// 			effect(() => {
	// 				const value = service.contentResource.value();
	// 				if (value !== null) {
	// 					result = value;
	// 					resolve(); // résout la Promise
	// 				}
	// 			});
	// 		});
	// 	});

	// 	//expect(result).toEqual(mockEntries);
	// 	expect(service['setLocalEntries']).toHaveBeenCalledWith(mockEntries);
	// });

	// xit('should call setLocalEntries when no cache is found', async () => {
	// 	spyOn(service['cdaClient'], 'getEntries').and.returnValue(
	// 		Promise.resolve({ items: [] } as any)
	// 	);
	// 	const setSpy = spyOn<any>(service, 'setLocalEntries');
	// 	spyOn<any>(service, 'getLocalEntries').and.returnValue(null);

	// 	const injector = TestBed.inject(Injector);

	// 	await new Promise<void>(resolve => {
	// 		runInInjectionContext(injector, () => {
	// 			effect(() => {
	// 				const value = service.contentResource.value();
	// 				if (value !== null) {
	// 					resolve();
	// 				}
	// 			});
	// 		});
	// 	});

	// 	expect(setSpy).toHaveBeenCalledWith(mockEntries);
	// });

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
		const mockEntriesWithDate = {
			...mockEntries,
			updatedAt: new Date(),
		};
		localStorageServiceSpy.get.and.returnValue(mockEntriesWithDate);

		const result = service['getLocalEntries']();
		expect(result).toEqual(mockEntriesWithDate);
	});
});
