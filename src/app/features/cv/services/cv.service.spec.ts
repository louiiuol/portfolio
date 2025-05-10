import { ResourceStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
	validJobInput,
	validSkill,
	validTrainingInput,
} from '@feat/contentfull/mocks';
import { ContentfullService } from '@feat/contentfull/services/contentfull/contentfull.service';
import { createMockResource, mockRouter } from '@mocks';
import { waitForResourceResolved } from '@shared/functions';
import type { CvFilters } from './cv.service';
import { CvService } from './cv.service';

// Fake Contentful entries fed to the service.
const mockEntries = {
	training: [validTrainingInput()],
	exprience: [validJobInput()],
	skill: [validSkill],
};

const mockContentResource = createMockResource<typeof mockEntries>(mockEntries);

const mockContentfullService = {
	contentResource: mockContentResource,
} as unknown as ContentfullService;

// -----------------------------------------------------------------------------
// Test suite
// -----------------------------------------------------------------------------

describe('CvService', () => {
	let service: CvService;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			providers: [
				CvService,
				{ provide: ContentfullService, useValue: mockContentfullService },
				{ provide: Router, useValue: mockRouter },
			],
		});

		service = TestBed.inject(CvService);
		await waitForResourceResolved(mockContentfullService.entries);
	});

	afterEach(() => {
		mockRouter.navigate.calls.reset();
	});

	// ---------------------------------------------------------------------------
	// Signals – raw exposure
	// ---------------------------------------------------------------------------

	it('should expose the technical skills from the resource', () => {
		const skills = service.skills();

		expect(skills.length).toBe(1);
		expect(skills[0].name).toBe(validSkill.name);
	});

	it('should compute events sorted by startDate desc (job first, then training)', () => {
		const { data, loading, error } = service.sortedEvents();

		expect(loading).toBeFalse();
		expect(error).toBeNull();
		expect(data.length).toBe(2);

		const firstStart = data[0].startDate;
		const secondStart = data[1].startDate;

		expect(firstStart.getTime()).toBeGreaterThan(secondStart.getTime());
	});

	it('should return an empty data set with loading=true when content is still loading', () => {
		(mockContentResource as any).__setStateUnsafe(ResourceStatus.Loading);

		const { data, loading, error } = service.sortedEvents();
		expect(loading).toBeTrue();
		expect(error).toBeNull();
		expect(data.length).toBe(0);

		(mockContentResource as any).__setStateUnsafe(ResourceStatus.Resolved);
	});

	// ---------------------------------------------------------------------------
	// Filters
	// ---------------------------------------------------------------------------

	it('should narrow the result set when filtering by skill', () => {
		service.updateFilters({
			skills: [validSkill.name],
		} satisfies Partial<CvFilters>);

		const filtered = service.sortedEvents().data;
		expect(filtered.length).toBe(1);
		expect(
			filtered.every(evt =>
				evt.skills?.some((s: any) => s.name === validSkill.name)
			)
		).toBeTrue();
	});

	it('should narrow the result set when filtering by eventType', () => {
		service.updateFilters({ eventType: 'Formation' });

		const filtered = service.sortedEvents().data;
		expect(filtered.length).toBe(1);
		expect(filtered[0].type).toBe('Formation');
	});

	// ---------------------------------------------------------------------------
	// Active event helpers – setActiveEvent / slideEvent / switchActiveEvent
	// ---------------------------------------------------------------------------

	it('should accept an event id (string) in setActiveEvent', () => {
		const trainingEvent = service
			.sortedEvents()
			.data.find(evt => evt.type === 'Formation')!;

		service.setActiveEvent(trainingEvent.id);

		expect(service.activeEvent()?.id).toBe(trainingEvent.id);
	});

	it('slideEvent("previous") should loop to the last event when currently at first', () => {
		const events = service.sortedEvents().data;

		// Start with the first
		service.setActiveEvent(events[0]);

		service.slideEvent('previous');
		expect(service.activeEvent()?.id).toBe(events[events.length - 1].id);
	});

	it('slideEvent should set the first / last event when no active one exists', () => {
		// Ensure no active event
		service.setActiveEvent(null);

		service.slideEvent('next');
		expect(service.activeEvent()?.name).toBe(
			service.sortedEvents().data[1].name
		);

		// Reset and test "previous"
		service.setActiveEvent(null);

		service.slideEvent('previous');
		const events = service.sortedEvents().data;
		expect(service.activeEvent()?.id).toBe(events[events.length - 1].id);
	});

	it('switchActiveEvent("next") should delegate to slideEvent', () => {
		const slideSpy = spyOn<any>(service, 'slideEvent').and.callThrough();

		service.switchActiveEvent('next');
		expect(slideSpy).toHaveBeenCalledWith('next');
	});

	it('switchActiveEvent(null) should delegate to setActiveEvent', () => {
		const setSpy = spyOn<any>(service, 'setActiveEvent').and.callThrough();

		service.switchActiveEvent(null);

		expect(setSpy).toHaveBeenCalledWith(null);
		expect(service.activeEvent()).toBeNull();
	});

	it('should keep the current active event when attempting to set an invalid ID', () => {
		const validEvent = service.sortedEvents().data[0];
		service.setActiveEvent(validEvent.id);

		service.setActiveEvent('non-existent-id');

		// Should still have the valid event as active
		expect(service.activeEvent()?.id).toBe(validEvent.id);
	});

	it('should correctly update and maintain filter state', () => {
		const initialFilters = {
			skills: ['Angular'],
			eventType: 'Formation' as const,
		};
		service.updateFilters(initialFilters);

		// Verify filters are applied correctly
		expect(service.filters()).toEqual(initialFilters);

		// Update a single filter property
		service.updateFilters({ eventType: 'Formation' });

		// Verify partial update works correctly
		expect(service.filters()).toEqual({
			skills: ['Angular'],
			eventType: 'Formation',
		});
	});
});
