import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IconComponent} from './icon.component';

describe('IconComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, IconComponent],
			declarations: [],
		}).compileComponents();
	});

	it('should create the icon component', () => {
		const icon = TestBed.createComponent(IconComponent).componentInstance;
		expect(icon).toBeTruthy();
	});

	xit('should fallback to logo if icon is invalid', () => {
		const icon = TestBed.createComponent(IconComponent).componentInstance;
		expect(icon).toBeTruthy();
	});
});
