import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconLogoComponent } from '../../shared/components/atoms/icon/icon-logo.component';
import { HomePage } from './home.page';

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomePage, IconLogoComponent],
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

	it('should have the correct title', () => {
		expect(component.title).toBe('portfolio');
	});

	it('should render the icon logo component', () => {
		const iconLogoElement = fixture.debugElement.query(By.css('app-icon-logo'));
		expect(iconLogoElement).toBeTruthy();
	});

	it('should have the correct class on the host element', () => {
		const hostElement = fixture.debugElement.nativeElement;
		expect(hostElement.classList).toContain('page');
		expect(hostElement.classList).toContain('items-center');
		expect(hostElement.classList).toContain('justify-center');
		expect(hostElement.classList).toContain('bg-linear-to-t');
		expect(hostElement.classList).toContain('from-primary-300');
		expect(hostElement.classList).toContain('to-primary-700');
	});
});
