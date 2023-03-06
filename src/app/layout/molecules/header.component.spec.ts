import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, HeaderComponent],
			declarations: [],
		}).compileComponents();
	});

	it('should create the header component', () => {
		const header = TestBed.createComponent(HeaderComponent).componentInstance;
		expect(header).toBeTruthy();
	});

	it('should render Logo with correct font family', () => {
		const header = TestBed.createComponent(HeaderComponent)
			.nativeElement as HTMLElement;
		const logo = header.querySelector('#logo');
		const computedFontFamily = logo
			? window.getComputedStyle(logo).getPropertyValue('font-family')
			: undefined;
		expect(computedFontFamily).toEqual('Niconne, cursive');
	});

	it('should render links', () => {
		const header = TestBed.createComponent(HeaderComponent)
			.nativeElement as HTMLElement;
		const linksCount =
			header.querySelector('#navigation-links')?.children.length;
		expect(linksCount).toEqual(3);
	});

  // TODO links should redirect to correct page (BLOCKED BY routes)
});
