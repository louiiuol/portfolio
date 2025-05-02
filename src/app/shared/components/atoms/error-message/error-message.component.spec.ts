import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
	let fixture: ComponentFixture<ErrorMessageComponent>;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			imports: [ErrorMessageComponent],
		}).createComponent(ErrorMessageComponent);
		// If required input, set it here
		fixture.detectChanges();
	});

	it('Should display correct default message', () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.textContent).toContain(
			fixture.componentInstance.errorMessage()
		);
	});

	it('Should update message when it changes', () => {
		fixture.componentRef.setInput('errorMessage', () => 'nouvelle erreur');
		fixture.detectChanges();

		expect((fixture.nativeElement as HTMLElement).textContent).toContain(
			'nouvelle erreur'
		);
	});
});
