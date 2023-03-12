import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ChangeDetectionStrategy} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TypistComponent} from './typist.component';

describe('TypistComponent', () => {
	let component: TypistComponent;
	let fixture: ComponentFixture<TypistComponent>;
	const toTypeMocked = ['Hello world'];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, TypistComponent, HttpClientTestingModule],
			declarations: [],
		})
			.overrideComponent(TypistComponent, {
				set: {changeDetection: ChangeDetectionStrategy.Default},
			})
			.compileComponents();

		fixture = TestBed.createComponent(TypistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should get typingArray if toType is set', () => {
		component.toType = toTypeMocked;
		expect(component['typingArray']).toEqual(toTypeMocked);
		expect(component['currentString']).toEqual(toTypeMocked[0]);
	});

	// TODO Add more advanced tests for Typing & Erasing fn
});
