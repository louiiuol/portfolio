import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { MenuItem } from './menu-overlay.component';
import { MenuOverlay } from './menu-overlay.component';

describe('MenuOverlayComponent', () => {
	let component: MenuOverlay<MenuItem>;
	let fixture: ComponentFixture<MenuOverlay<MenuItem>>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MenuOverlay],
		}).compileComponents();

		fixture = TestBed.createComponent(MenuOverlay);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('menuItems', [
			{ label: 'Item 1', action: jasmine.createSpy('action1') },
			{ label: 'Item 2' },
		]);

		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle dropdown visibility when the trigger button is clicked', () => {
		const triggerButton = fixture.debugElement.query(By.css('button'));
		triggerButton.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect((component as any).isOpen()).toBeTrue();

		triggerButton.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect((component as any).isOpen()).toBeFalse();
	});

	it('should render menu items correctly', () => {
		(component as any).isOpen.set(true);
		fixture.detectChanges();

		const menuItems = fixture.debugElement.queryAll(By.css('ul li'));
		expect(menuItems.length).toBe(2);
		expect(menuItems[0].nativeElement.textContent.trim()).toBe('Item 1');
		expect(menuItems[1].nativeElement.textContent.trim()).toBe('Item 2');
	});

	it('should close the dropdown when a menu item with an action is clicked', () => {
		(component as any).isOpen.set(true);
		fixture.detectChanges();

		const menuItemButton = fixture.debugElement.query(By.css('ul li button'));
		menuItemButton.triggerEventHandler('click', null);
		fixture.detectChanges();

		expect((component as any).isOpen()).toBeFalse();
	});
});
