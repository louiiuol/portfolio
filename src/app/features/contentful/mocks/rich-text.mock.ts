import type { FormattedRichText } from '../types';

export const validDocument = {
	nodeType: 'document',
	content: [
		{ nodeType: 'paragraph', content: [], value: 'Sample paragraph' },
		{
			nodeType: 'list',
			content: [
				{ nodeType: 'list-item', value: 'Item 1' },
				{ nodeType: 'list-item', value: 'Item 2' },
			],
		},
	],
};

export const invalidDocument = {
	nodeType: 'invalid',
	content: 'Not an array',
};

export const validFormattedRichText: FormattedRichText = [
	{ type: 'text', content: 'Sample text' },
	{ type: 'list', content: ['Item 1', 'Item 2'] },
];

export const invalidFormattedRichText = [
	{ type: 'invalid', content: 'Sample text' },
	{ type: 'list', content: 'Not an array' },
];
