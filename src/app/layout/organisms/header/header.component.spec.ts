import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChangeDetectionStrategy} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageService} from 'primeng/api';
import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let nativeElement: Element;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, HeaderComponent, HttpClientTestingModule],
			providers: [MessageService],
		})
			.overrideComponent(HeaderComponent, {
				set: {changeDetection: ChangeDetectionStrategy.Default},
			})
			.compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		nativeElement = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create the header component', () => {
		expect(component).toBeTruthy();
	});

	it('should render Logo with correct font family', () => {
		const spanTag = nativeElement.querySelector('#logo span ');
		expect(
			spanTag &&
				window.getComputedStyle(spanTag).getPropertyValue('font-family')
		).toEqual('Niconne, cursive');
	});

	it('should render 3 links', () => {
		expect(
			nativeElement.querySelector('#navigation-links')?.children.length
		).toEqual(3);
	});

	// TODO links should redirect to correct page (waiting for routes to be valid)
});
