import { Component } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ChevronIcon } from './chevron.icon';

@Component({
	template: `<app-icon-chevron [direction]="direction" [size]="size" />`,
	imports: [ChevronIcon],
})
class TestHostComponent {
	size: 'size-4' | 'size-6' = 'size-4';
	direction: 'up' | 'down' | 'left' | 'right' = 'left';
}

describe('ChevronIcon', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let hostComponent: TestHostComponent;
	let chevronElement: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		hostComponent = fixture.componentInstance;
		chevronElement = fixture.nativeElement.querySelector('app-icon-chevron');
	});

	it('should create the component', () => {
		expect(chevronElement).toBeTruthy();
	});

	it('should apply the correct size class', () => {
		hostComponent.size = 'size-6';
		fixture.detectChanges();
		expect(chevronElement.classList.contains('size-6')).toBeTrue();
	});

	it('should apply the correct rotation for "up" direction', () => {
		hostComponent.direction = 'up';
		fixture.detectChanges();
		const pathElement = chevronElement.querySelector('path');
		expect(pathElement?.style.transform).toBe('rotate(-90deg)');
	});

	it('should apply the correct rotation for "down" direction', () => {
		hostComponent.direction = 'down';
		fixture.detectChanges();
		const pathElement = chevronElement.querySelector('path');
		expect(pathElement?.style.transform).toBe('rotate(90deg)');
	});

	it('should apply the correct rotation for "left" direction', () => {
		hostComponent.direction = 'left';
		fixture.detectChanges();
		const pathElement = chevronElement.querySelector('path');
		expect(pathElement?.style.transform).toBe('rotate(0deg)');
	});

	it('should apply the correct rotation for "right" direction', () => {
		hostComponent.direction = 'right';
		fixture.detectChanges();
		const pathElement = chevronElement.querySelector('path');
		expect(pathElement?.style.transform).toBe('rotate(180deg)');
	});
});
