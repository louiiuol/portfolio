import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

@Component({
	imports: [LoaderComponent],
	template: `<app-loader [message]="message()" />`,
})
class HostComponent {
	message = signal('chargement personnalisé');
}

describe('LoaderComponent', () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it('Should display correct message with Capitalize pipe', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent?.toLowerCase()).toContain(
			'Chargement personnalisé'.toLowerCase()
		);
	});

	it('should contain spinner with animation', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const spinner = compiled.querySelector('.animate-spin');
		expect(spinner).toBeTruthy();
	});

	it('Should update message when it changes', () => {
		const host = fixture.componentInstance;
		host.message.set('nouveau chargement');
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent?.toLowerCase()).toContain(
			'Nouveau chargement'.toLowerCase()
		);
	});
});
