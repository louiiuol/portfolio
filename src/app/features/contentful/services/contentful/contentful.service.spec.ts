import { ResourceStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { mockLocalStorageService } from '@mocks';
import { waitForResourceResolved } from '@shared/functions';
import { LocalStorageService } from '@shared/services';
import { ContentfulService, INITIAL_ENTRIES } from './contentful.service';

const mockCdaClient = { getEntries: jasmine.createSpy() };

describe('ContentfulService', () => {
	let service: ContentfulService;

	beforeEach(() => {
		jasmine.clock().install(); // ⏱️ fake timers

		TestBed.configureTestingModule({
			providers: [
				ContentfulService,
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
			],
		});

		service = TestBed.inject(ContentfulService);
		(service as any).cdaClient = mockCdaClient;
	});

	afterEach(() => {
		mockLocalStorageService.get.calls.reset();
		mockLocalStorageService.set.calls.reset();
		mockLocalStorageService.remove.calls.reset();
		mockCdaClient.getEntries.calls.reset();
		jasmine.clock().uninstall();
	});

	it('should resolve to local cache if present and fresh', async () => {
		mockLocalStorageService.get.and.returnValue({
			...INITIAL_ENTRIES(),
			updatedAt: new Date(),
		});

		/** FIRST microtask: getLocalEntries() starts the sleep(1000) */
		await Promise.resolve();

		jasmine.clock().tick(1000); // ⏩  on “avance” le sleep

		await waitForResourceResolved(service.entries);
		expect(mockLocalStorageService.get).toHaveBeenCalled();
		expect(service.entries.status()).toBe(ResourceStatus.Resolved);
	});

	it('should fallback content by fetching contentful entries if no local found', async () => {
		mockLocalStorageService.get.and.returnValue(null);
		mockCdaClient.getEntries.and.returnValue(
			Promise.resolve({
				items: [
					{
						sys: { contentType: { sys: { id: 'exprience' } }, id: '1' },
						fields: {},
					},
				],
			})
		);
		await Promise.resolve();
		jasmine.clock().tick(1000); // ⏩  on “avance” le sleep

		const data = await waitForResourceResolved(service.entries);

		expect(data?.exprience.length).toBe(1);
		expect(mockLocalStorageService.set).toHaveBeenCalled();
	});

	describe('getLocalEntries', () => {
		it('should return local entries if they are recent', async () => {
			mockLocalStorageService.get.and.returnValue({
				...INITIAL_ENTRIES(),
				updatedAt: new Date(),
			});

			const p = (service as any).getLocalEntries();

			jasmine.clock().tick(1500); // ⏩  on “avance” le sleep
			await Promise.resolve();

			const result = await p;

			expect(result).toEqual(jasmine.objectContaining({ exprience: [] }));
			expect(mockLocalStorageService.get).toHaveBeenCalled();
		});

		it('should remove and return null if local entry is too old', async () => {
			const oldDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 15);
			const mockData = {
				...INITIAL_ENTRIES(),
				updatedAt: oldDate,
			};
			mockLocalStorageService.get.and.returnValue(mockData);

			const result = await (service as any).getLocalEntries();

			expect(result).toBeNull();
			expect(mockLocalStorageService.remove).toHaveBeenCalled();
		});
	});

	describe('fetchContentfulEntries', () => {
		it('should fetch entries and store them locally', async () => {
			const contentfulResponse = {
				items: [
					{
						sys: { contentType: { sys: { id: 'exprience' } }, id: '1' },
						fields: {},
					},
				],
			};

			mockCdaClient.getEntries.and.returnValue(
				Promise.resolve(contentfulResponse)
			);

			const result = await (service as any).fetchContentfulEntries();

			expect(result.exprience.length).toBe(1);
			expect(mockLocalStorageService.set).toHaveBeenCalledWith(
				'contentful-entries',
				jasmine.objectContaining({
					exprience: jasmine.any(Array),
					updatedAt: jasmine.any(Date),
				})
			);
		});

		it('should throw an error when Contentful returns errors', async () => {
			const contentfulResponse = {
				items: [],
				errors: [{ message: 'error' }],
			};
			mockCdaClient.getEntries.and.returnValue(
				Promise.resolve(contentfulResponse)
			);

			await expectAsync(
				(service as any).fetchContentfulEntries()
			).toBeRejectedWithError(/Aucun contenu trouvé/);
		});
	});
});
