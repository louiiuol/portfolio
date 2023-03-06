import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, AppComponent],
			declarations: [],
		}).compileComponents();
	});

	it('should create the app', () => {
		const app = TestBed.createComponent(AppComponent).componentInstance;
		expect(app).toBeTruthy();
	});

	it('should render header component', () => {
		const app = TestBed.createComponent(AppComponent)
			.nativeElement as HTMLElement;
		expect(app.querySelector('lou-header')).toBeTruthy();
	});
});
