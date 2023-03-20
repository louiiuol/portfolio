import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {NgxLoadingModule} from 'ngx-loading';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
const primeModules = [
	ButtonModule,
	InputTextModule,
	InputTextareaModule,
	TooltipModule,
];

import {FieldOptions} from '@core';

/**
 * Generic Form Component that makes building form UI easy !
 * Simply provide a valid FormGroup and configured fieldOptions array
 * @author louiiuol
 * @version 0.1.0
 */
@Component({
	selector: 'lou-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxLoadingModule,
		...primeModules,
	],
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
	@Input() isLoading = false;
	@Input() form!: FormGroup;
	@Input() fields!: FieldOptions[];

	@Output() submitted = new EventEmitter();

	/**
	 * Emits new form values (submitted only if FormGroup is valid)
	 */
	onSubmit(): void {
		this.submitted.emit(this.form.value);
	}

	/**
	 * Returns matching error message with control active errors (on at a time, based on error "severity")
	 * @param control element possibly containing errors
	 * @returns error message
	 */
	getErrorMessage(control: AbstractControl | null): string | void {
		if (control?.hasError('required')) return "Don't be shy 😇";
		if (control?.hasError('email')) return "This email doesn't look valid 😈 ";
	}
}
