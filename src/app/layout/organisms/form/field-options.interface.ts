export interface FieldOptions {
	name: string;
	type: 'text' | 'textarea';
	label?: string;
	placeholder?: string;
	icon?: string;
	errorMessages?: {type: string; value: string}[];
	autofocus?: true;
	required?: boolean;
	mask?: string;
	col?: string;
}
