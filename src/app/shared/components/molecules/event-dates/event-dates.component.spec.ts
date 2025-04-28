// loader.component.spec.ts
import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { EventDatesComponent } from './event-dates.component';

@Component({
	imports: [EventDatesComponent],
	template: `<app-event-dates [event]="dates" />`,
})
class HostComponent {
	dates = signal({ startDate: new Date('2016-01-01'), endDate: new Date() });
}

//@todo add tests
xdescribe('EventDatesComponent', () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});
});
