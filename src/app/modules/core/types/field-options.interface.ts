import {ValidatorFn} from '@angular/forms';

export interface FieldOptions {
	name: string;
	type: 'text' | 'textarea';
	content: {
		placeholder: string;
		label?: string;
		icon?: string;
		hint?: string;
	};
	constraints?: ValidatorFn[];
	autofocus?: true;
	errorMessages?: {type: string; value: string}[];
	column?: `col-${3 | 4 | 6 | 8 | 9 | 12}`;
}
