import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup} from '@angular/forms';

import {NgxLoadingModule} from 'ngx-loading';

import {first, mergeMap, of, tap} from 'rxjs';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
const primeModules = [DialogModule, ButtonModule];

import {CONTACT_FIELDS, CONTACT_FORM_GROUP} from './contact.form';
import {ContactService} from './contact.service';
import {FormComponent} from '../form/form.component';

/**
 * Modal including custom form to send email to professional inbox.
 * @author louiiuol
 * @version 0.1.0
 */
@Component({
	standalone: true,
	selector: 'lou-contact',
	imports: [CommonModule, NgxLoadingModule, ...primeModules, FormComponent],
	providers: [ContactService],
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContactComponent {
	showDialog = false;
	isLoading = false;

	readonly fields = CONTACT_FIELDS;
	readonly contactForm = new FormGroup(CONTACT_FORM_GROUP);

	constructor(private _contact: ContactService) {}

	sendFormValueAndHandleResponse(): void {
		this.isLoading = true;
		this._contact
			.checkEmail(this.contactForm.value.email)
			.pipe(
				tap(res => !res && this.contactForm?.get('email')?.setValue('')),
				mergeMap(isValidEmail =>
					isValidEmail
						? this._contact.sendEmail(this.contactForm.value)
						: of(false)
				)
			)
			.pipe(first())
			.subscribe(completed => {
				if (completed === true) {
					this.showDialog = false;
					window.open('https://mailthis.to/confirm');
				}
				this.isLoading = false;
			});
	}
}
