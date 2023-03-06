import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IconComponent} from './icon.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('IconComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, IconComponent, HttpClientTestingModule],
			declarations: [],
		}).compileComponents();
	});

	it('should create the icon component', () => {
		const icon = TestBed.createComponent(IconComponent).componentInstance;
		expect(icon).toBeTruthy();
	});
});
