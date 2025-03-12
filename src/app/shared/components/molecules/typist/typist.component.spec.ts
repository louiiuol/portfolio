import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TypistComponent } from './typist.component';

describe('TypistComponent', () => {
	let component: TypistComponent;
	let fixture: ComponentFixture<TypistComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TypistComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TypistComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default values', () => {
		expect(component.infinite()).toBe(false);
		expect(component.typingSpeed()).toBe(50);
		expect(component.erasingSpeed()).toBe(45);
		expect(component.newTextDelay()).toBe(1.5);
		expect(component.startingDelay()).toBe(1.5);
	});

	// @todo how to test protected field ...
	// it('should handle empty toType array', done => {
	// 	fixture.componentRef.setInput('toType', []);
	// 	component.typingState$.subscribe(state => {
	// 		expect(state.typingValue).toBe('');
	// 		expect(state.isTyping).toBe(false);
	// 		expect(state.isDoneTyping).toBe(false);
	// 		done();
	// 	});
	// });
});
