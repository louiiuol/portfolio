import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ScrollIndicatorsComponent} from './scroll-indicators.component';

describe('ScrollIndicatorsComponent', () => {
	let component: ScrollIndicatorsComponent;
	let fixture: ComponentFixture<ScrollIndicatorsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ScrollIndicatorsComponent, RouterTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ScrollIndicatorsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
