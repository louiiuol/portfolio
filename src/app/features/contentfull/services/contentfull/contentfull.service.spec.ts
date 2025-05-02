import { TestBed } from '@angular/core/testing';
import { mockLocalStorageService } from '@mocks';
import { LocalStorageService } from '@shared/services';
import { ContentfullService } from './contentfull.service';

const mockClient = {
	getEntries: jasmine.createSpy(),
};

// @todo: Add tests for ressource (next ng version mb bringing tools to test it)
describe('ContentfullService', () => {
	let service: ContentfullService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContentfullService,
				{ provide: LocalStorageService, useValue: mockLocalStorageService },
			],
		});

		service = TestBed.inject(ContentfullService);
		// Directly override the internal client instance
		(service as any).cdaClient = mockClient;
	});

	afterEach(() => {
		mockLocalStorageService.get.calls.reset();
		mockLocalStorageService.set.calls.reset();
		mockLocalStorageService.remove.calls.reset();
		mockClient.getEntries.calls.reset();
	});

	describe('getLocalEntries', () => {
		it('should return local entries if they are recent', async () => {
			const mockData = {
				exprience: [],
				skill: [],
				company: [],
				school: [],
				diploma: [],
				training: [],
				updatedAt: new Date(),
			};
			mockLocalStorageService.get.and.returnValue(mockData);

			const result = await (service as any).getLocalEntries();

			expect(result).toEqual(jasmine.objectContaining({ exprience: [] }));
			expect(mockLocalStorageService.get).toHaveBeenCalled();
		});

		it('should remove and return null if local entry is too old', async () => {
			const oldDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 15);
			const mockData = {
				exprience: [],
				skill: [],
				company: [],
				school: [],
				diploma: [],
				training: [],
				updatedAt: oldDate,
			};
			mockLocalStorageService.get.and.returnValue(mockData);

			const result = await (service as any).getLocalEntries();

			expect(result).toBeNull();
			expect(mockLocalStorageService.remove).toHaveBeenCalled();
		});
	});

	describe('fetchContentfullEntries', () => {
		it('should fetch entries and store them locally', async () => {
			const contentfulResponse = {
				items: [
					{
						sys: { contentType: { sys: { id: 'exprience' } }, id: '1' },
						fields: {},
					},
				],
			};

			mockClient.getEntries.and.returnValue(
				Promise.resolve(contentfulResponse)
			);

			const result = await (service as any).fetchContentfullEntries();

			expect(result.exprience.length).toBe(1);
			expect(mockLocalStorageService.set).toHaveBeenCalledWith(
				'contentfull-entries',
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
			mockClient.getEntries.and.returnValue(
				Promise.resolve(contentfulResponse)
			);

			await expectAsync(
				(service as any).fetchContentfullEntries()
			).toBeRejectedWithError(/Aucun contenu trouvé/);
		});
	});
});
