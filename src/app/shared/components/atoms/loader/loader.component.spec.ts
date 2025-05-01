import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
	let fixture: ComponentFixture<LoaderComponent>;
	let compiled: HTMLElement;

	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			imports: [LoaderComponent],
		}).createComponent(LoaderComponent);
		// Set any required inputs here if needed
		fixture.detectChanges();
		compiled = fixture.nativeElement as HTMLElement;
	});

	it('Should display correct default message', () => {
		expect(compiled.textContent?.toLowerCase()).toContain(
			'chargement du contenu'.toLowerCase()
		);
	});

	it('Should display correct message with Capitalize pipe', () => {
		fixture.componentRef.setInput('message', 'chargement personnalisé');
		fixture.detectChanges();

		expect(compiled.textContent).toContain('Chargement personnalisé');
	});

	it('should have message ended with "⏳"', () => {
		expect(compiled.textContent?.endsWith('⏳')).toBe(true);
	});

	it('should contain spinner with animation', () => {
		const spinner = compiled.querySelector('.animate-spin');
		expect(spinner).toBeTruthy();
	});
});
