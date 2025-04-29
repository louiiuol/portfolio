import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { createDateEvent } from '@mocks/stubs/date-event-create.stub';
import { EventDatesComponent } from './event-dates.component';

describe('EventDatesComponent', () => {
	let component: EventDatesComponent;
	let fixture: ComponentFixture<EventDatesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EventDatesComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EventDatesComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default values', () => {
		expect(component.showIcon()).toBe(false);
		expect(component.showTimeDiff()).toBe(false);
		expect(component.dateFormat()).toBe('MMM yyyy');
	});

	it('should display the start date correctly', () => {
		fixture.componentRef.setInput('event', createDateEvent());
		fixture.detectChanges();
		const span = fixture.nativeElement.querySelector('span');
		expect(span.textContent).toContain('Jan 2023');
	});

	it('should display the start and end dates correctly', () => {
		fixture.componentRef.setInput('event', createDateEvent('2023-12-31'));
		fixture.detectChanges();
		const spans = fixture.nativeElement.querySelectorAll('span');
		expect(spans[0].textContent).toContain('Jan 2023');
		expect(spans[1].textContent).toContain('Dec 2023');
	});

	it('should display "Aujourd\'hui" if endDate is null', () => {
		fixture.componentRef.setInput('event', createDateEvent());
		fixture.detectChanges();
		const spans = fixture.nativeElement.querySelectorAll('span');

		expect(spans[1].textContent).toContain("Aujourd'hui");
	});

	it('should display the time difference if showTimeDiff is true', () => {
		fixture.componentRef.setInput('event', createDateEvent('2023-12-31'));
		fixture.componentRef.setInput('showTimeDiff', true);

		fixture.detectChanges();
		const timeDiffSpan = fixture.nativeElement.querySelector('.font-semibold');
		expect(timeDiffSpan).toBeTruthy();
		expect(timeDiffSpan.textContent).toContain('('); // Assuming the pipe outputs something like "(X months)"
	});

	it('should display the calendar icon if showIcon is true', () => {
		fixture.componentRef.setInput('showIcon', true);
		fixture.componentRef.setInput('event', createDateEvent());
		fixture.detectChanges();
		const icon = fixture.nativeElement.querySelector('app-icon-calendar');
		expect(icon).toBeTruthy();
	});
});
