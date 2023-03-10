import {
	ComponentFixture,
	TestBed,
} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IconComponent} from './icon.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChangeDetectionStrategy, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('IconComponent', () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;
	let debug: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, IconComponent, HttpClientTestingModule],
			declarations: [],
		})
			.overrideComponent(IconComponent, {
				set: {changeDetection: ChangeDetectionStrategy.Default},
			})
			.compileComponents();
		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		debug = fixture.debugElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should not render if no name is given', () => {
		fixture.componentRef.setInput('name', undefined);
		console.log(debug);
		expect(debug.query(By.css('span'))).toBeNull();
	});
});
