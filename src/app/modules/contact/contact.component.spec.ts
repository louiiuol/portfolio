import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MessageService} from 'primeng/api';

import {ContactComponent} from './contact.component';

describe('ContactComponent', () => {
	let component: ContactComponent;
	let fixture: ComponentFixture<ContactComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContactComponent, HttpClientTestingModule],
			providers: [MessageService],
		}).compileComponents();

		fixture = TestBed.createComponent(ContactComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
