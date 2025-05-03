import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Card } from './card.component';

@Component({
	imports: [Card],
	template: `<app-card [closable]="closable()">
		<div subHeader>Sub header content</div>
		<div>Main content</div>
		<div footer>Footer content</div>
	</app-card>`,
})
class HostComponent {
	closable = signal(true);
}
const closeButtonSelector = 'button[aria-label="Fermer la vue"]';

describe('CardComponent', () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			imports: [HostComponent],
		}).createComponent(HostComponent);

		fixture.detectChanges();
	});

	it('should render the card component', () => {
		const cardElement = fixture.nativeElement.querySelector('app-card');
		expect(cardElement).toBeTruthy();
	});

	it('should emit the closed event when the close button is clicked', () => {
		const cardComponent = fixture.debugElement.children[0]
			.componentInstance as Card;
		spyOn(cardComponent.closed, 'emit');

		const closeButton =
			fixture.nativeElement.querySelector(closeButtonSelector);
		closeButton.click();

		expect(cardComponent.closed.emit).toHaveBeenCalled();
	});

	it('should not render the close button if closable is false', () => {
		const host = fixture.componentInstance;
		host.closable.set(false);
		fixture.detectChanges();

		const closeButton =
			fixture.nativeElement.querySelector(closeButtonSelector);
		expect(closeButton).toBeNull();
	});

	it('should render the close button if closable is true', () => {
		const host = fixture.componentInstance;
		host.closable.set(true);
		fixture.detectChanges();

		const closeButton =
			fixture.nativeElement.querySelector(closeButtonSelector);
		expect(closeButton).toBeTruthy();
	});

	it('should render the subHeader content', () => {
		const subHeaderElement = fixture.nativeElement.querySelector('[subHeader]');
		expect(subHeaderElement.textContent).toContain('Sub header content');
	});

	it('should render the main content', () => {
		const mainContentElement = fixture.nativeElement.querySelector('section');
		expect(mainContentElement.textContent).toContain('Main content');
	});

	it('should render the footer content', () => {
		const footerElement = fixture.nativeElement.querySelector('footer');
		expect(footerElement.textContent).toContain('Footer content');
	});
});
