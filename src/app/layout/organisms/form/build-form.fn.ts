import { FormGroup, AbstractControl, FormControl } from "@angular/forms";
import { FieldOptions } from "./field-options.interface";

export function buildFormGroup(fields: FieldOptions[]): FormGroup {
	const formGroup: {
		[x: string]: AbstractControl<unknown, unknown>;
	} = {};
	fields.forEach(field => {
		formGroup[field.name] = new FormControl(null, field.constraints);
	});
	return new FormGroup(formGroup);
}
