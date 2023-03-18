import {FormControl, Validators} from '@angular/forms';
import {FieldOptions} from '../form/field-options.interface';

export const CONTACT_FORM_GROUP = {
	fullName: new FormControl('', [Validators.required]) as FormControl<string>,
	email: new FormControl('', [
		Validators.required,
		Validators.email,
	]) as FormControl<string>,
	subject: new FormControl('', [Validators.required]) as FormControl<string>,
};

export const CONTACT_FIELDS: FieldOptions[] = [
	{
		name: 'fullName',
		type: 'text',
		label: "What's your name ?",
		placeholder: 'John Doe',
		required: true,
		icon: 'user',
		autofocus: true,
		errorMessages: [{type: 'required', value: "Don't be shy 👀"}],
	},
	{
		name: 'email',
		type: 'text',
		label: 'How can I reach you ?',
		icon: 'envelope',
		placeholder: 'email@example.com',
		required: true,
	},
	{
		name: 'subject',
		required: true,
		type: 'textarea',
		label: 'What do you want to talk about ?',
		icon: 'page',
		placeholder: "I'm listening 👀",
		errorMessages: [
			{type: 'required', value: "I can't reply if I don't know the subject"},
		],
	},
];
