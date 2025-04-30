import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { RichTextComponent } from './rich-text.component';

describe('RichTextComponent', () => {
	let component: RichTextComponent;
	let fixture: ComponentFixture<RichTextComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RichTextComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RichTextComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('content', []);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render text content correctly', () => {
		fixture.componentRef.setInput('content', [
			{ type: 'text', content: 'Sample text content' },
		]);
		fixture.detectChanges();

		const paragraph = fixture.nativeElement.querySelector('p');
		expect(paragraph).toBeTruthy();
		expect(paragraph.textContent).toContain('Sample text content');
	});

	it('should render list content correctly', () => {
		fixture.componentRef.setInput('content', [
			{ type: 'list', content: ['Item 1', 'Item 2', 'Item 3'] },
		]);

		fixture.detectChanges();

		const list = fixture.nativeElement.querySelector('ul');
		expect(list).toBeTruthy();
		const listItems = list.querySelectorAll('li');
		expect(listItems.length).toBe(3);
		expect(listItems[0].textContent).toContain('Item 1');
		expect(listItems[1].textContent).toContain('Item 2');
		expect(listItems[2].textContent).toContain('Item 3');
	});

	it('should not render anything if content is empty', () => {
		fixture.componentRef.setInput('content', []);

		fixture.detectChanges();

		const paragraph = fixture.nativeElement.querySelector('p');
		const list = fixture.nativeElement.querySelector('ul');
		expect(paragraph).toBeNull();
		expect(list).toBeNull();
	});
});
