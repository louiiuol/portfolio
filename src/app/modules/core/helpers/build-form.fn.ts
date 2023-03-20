import {FormGroup, AbstractControl, FormControl} from '@angular/forms';
import {FieldOptions} from '../types/field-options.interface';

/**
 * Generate an angular FormGroup based on custom FieldOptions array given.
 * * Check FieldOptions interface to see how to configure inputs and their constraints or content !
 * @param fields configure how field should be created
 * @returns new FormGroup() instance
 * @author louiiuol
 * @version 1.0.0
 */
export function buildFormGroup(fields: FieldOptions[]): FormGroup {
	const formGroup: {
		[x: string]: AbstractControl<unknown, unknown>;
	} = {};
	fields.forEach(field => {
		formGroup[field.name] = new FormControl(null, field.constraints);
	});
	return new FormGroup(formGroup);
}
