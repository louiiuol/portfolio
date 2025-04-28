import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomePage } from './home.page';

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HomePage],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have the correct class on the host element', () => {
		const hostElement = fixture.debugElement.nativeElement;
		expect(hostElement.classList).toContain('page');
	});

	it('should render the icon logo component', () => {
		const iconLogoElement = fixture.debugElement.query(By.css('app-icon-logo'));
		expect(iconLogoElement).toBeTruthy();
	});

	it('should have the correct introTexts', () => {
		expect((component as any).introTexts.length).toBe(3);
		expect(Array.isArray((component as any).introTexts)).toBe(true);
	});

	it('should render the TypistComponent', () => {
		const typistElement = fixture.debugElement.query(By.css('app-typist'));
		expect(typistElement).toBeTruthy();
	});
});
