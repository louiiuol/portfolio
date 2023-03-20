import {Validators} from '@angular/forms';
import {FieldOptions} from '../form/field-options.interface';

export const CONTACT_FIELDS: FieldOptions[] = [
	{
		name: 'fullName',
		type: 'text',
		constraints: [Validators.required],
		content: {
			label: "What's your name ?",
			placeholder: 'John Doe',
			icon: 'user',
		},
		autofocus: true,
		column: 'col-6',
	},
	{
		name: 'email',
		type: 'text',
		content: {
			label: 'How can I reach you ?',
			icon: 'envelope',
			placeholder: 'email@example.com',
		},
		constraints: [Validators.required, Validators.email],
		column: 'col-6',
	},
	{
		name: 'subject',
		type: 'textarea',
		content: {
			placeholder: "I'm listening 👀",
			label: 'What do you want to talk about ?',
		},
		constraints: [Validators.required],
	},
];
