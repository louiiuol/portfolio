import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideActivatedRouteMocked } from '@mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideActivatedRouteMocked()],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should have the correct host class', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const appElement = fixture.debugElement.nativeElement;
		expect(appElement.classList.contains('flex')).toBeTruthy();
		expect(appElement.classList.contains('flex-col')).toBeTruthy();
	});

	it('should render header, main', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const header = fixture.debugElement.query(By.css('app-header'));
		const main = fixture.debugElement.query(By.css('main'));
		expect(header).toBeTruthy();
		expect(main).toBeTruthy();
	});

	it('should render <main> with correct classes', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const main = fixture.debugElement.query(By.css('main'));
		expect(main.classes['flex-1']).toBeTrue();
		expect(main.classes['overflow-y-auto']).toBeTrue();
	});
});
