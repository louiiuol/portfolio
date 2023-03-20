import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChangeDetectionStrategy} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, HomeComponent, HttpClientTestingModule],
			declarations: [],
		})
			.overrideComponent(HomeComponent, {
				set: {changeDetection: ChangeDetectionStrategy.Default},
			})
			.compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the home component', () => {
		expect(component).toBeTruthy();
	});

	it('should contain introTexts', () => {
		expect(component.introTexts.length).toEqual(5);
	});
});
