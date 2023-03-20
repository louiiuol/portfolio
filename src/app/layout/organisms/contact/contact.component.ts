import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxLoadingModule} from 'ngx-loading';

import {first, mergeMap, Observable, of, tap} from 'rxjs';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
const primeModules = [DialogModule, ButtonModule];

import {CONTACT_FIELDS} from './contact.form';
import {ContactService} from './contact.service';
import {FormComponent} from '../form/form.component';
import {buildFormGroup} from '../form/build-form.fn';

/**
 * Modal including custom form to send email to professional inbox.
 * @author louiiuol
 * @version 0.1.1
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
	readonly contactForm = buildFormGroup(CONTACT_FIELDS);

	constructor(private _contact: ContactService) {}

	sendFormValueAndHandleResponse(): void {
		this.isLoading = true;
		this._contact
			.checkEmail(this.contactForm.value.email)
			.pipe(
				tap(this.resetEmailWhenInputInvalid),
				mergeMap(this.sendMessageWhenEmailIsValid),
				first()
			)
			.subscribe(completed => {
				this.checkConfirmationAndCleanUI(completed);
				this.isLoading = false;
			});
	}

	private sendMessageWhenEmailIsValid = (
		isValidEmail: boolean
	): Observable<boolean> =>
		isValidEmail ? this._contact.sendEmail(this.contactForm.value) : of(false);

	private resetEmailWhenInputInvalid = (
		res: boolean
	): false | undefined | void =>
		!res && this.contactForm?.get('email')?.setValue('');

	private checkConfirmationAndCleanUI = (completed: boolean) => {
		if (completed === true) {
			this.showDialog = false;
			this.contactForm.reset();
			setTimeout(() => {
				open('https://mailthis.to/confirm', '_blank', 'width=300,height=300');
			}, 2000);
		}
	};
}
