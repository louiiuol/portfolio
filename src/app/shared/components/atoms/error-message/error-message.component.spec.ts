// loader.component.spec.ts
import { Component, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

@Component({
	imports: [ErrorMessageComponent],
	template: `<app-error-message [errorMessage]="message()" />`,
})
class HostComponent {
	message = signal('erreur personnalisé');
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

	it('Should display correct message', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent).toContain('erreur personnalisé');
	});

	it('Should update message when it changes', () => {
		const host = fixture.componentInstance;
		host.message.set('nouvelle erreur');
		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent).toContain('nouvelle erreur');
	});
});
