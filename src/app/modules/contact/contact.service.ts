import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable()
export class ContactService {
	constructor(
		private readonly _http: HttpClient,
		private _messageService: MessageService
	) {}

	/**
	 * Checks if email actually exists, thanks to abstract api.
	 * * This fn will notify user w/ message if email is invalid
	 * @param email to be tested
	 * @returns true if email is valid, false otherwise
	 */
	checkEmail(email?: string): Observable<boolean> {
		if (!email) throw of(false);
		const ABSTRACT_API_KEY = '9dd362228ca044ceaaeb115c7a1eee9b';
		return this._http
			.get<{
				email: string;
				is_smtp_valid: {value: boolean};
			}>(`https://emailvalidation.abstractapi.com/v1/`, {
				params: {
					api_key: ABSTRACT_API_KEY,
					email,
				},
			})
			.pipe(
				map(res => {
					const isValidEmail = !!res.is_smtp_valid.value;
					if (!isValidEmail)
						this._messageService.add({
							key: 'root',
							severity: 'error',
							summary: 'Email not found !',
							detail: "This email address doesn't exist ! 🙄 ",
						});
					return isValidEmail;
				})
			);
	}

	/**
	 * Send email to custom address alias via `mail-this.to` api.
	 * * This fn will notify user if request was successful or not
	 * @param form values to be sent
	 * @returns true if email was successfully sent, false otherwise
	 */
	sendEmail(
		form: Partial<{fullName: string; email: string; subject: string}>
	): Observable<boolean> {
		return this._http
			.post<unknown>('https://mailthis.to/louiiuol', {
				_subject: `You have a new form submission on your portfolio, from ${form.fullName} !`,
				_replyto: form.email,
				name: form.fullName,
				message: form.subject,
			})
			.pipe(
				catchError(error => of(error)),
				map(res => {
					if (res.status === 200) {
						this._messageService.add({
							key: 'root',
							severity: 'success',
							summary: 'Thank you for reaching out !',
							detail:
								' You will be redirected in order to confirm you are not a bot 🙊 ',
						});
						return true;
					} else {
						this._messageService.add({
							key: 'root',
							severity: 'error',
							summary: 'Internal Server Error',
							detail: 'Failed to send email ! Please, try again later ! 🙊 ',
						});
						return false;
					}
				})
			);
	}
}
