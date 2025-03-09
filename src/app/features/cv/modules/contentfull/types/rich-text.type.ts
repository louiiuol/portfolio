import { isSchemaType } from '@shared/fns/type-checker/is-schema-type.fn';
import type { UnknownRecord } from '@shared/types/unknown-record.type';
import { z } from 'zod';

// RICH TEXT (FORMATTED)
export const formattedRichTextSchema = z.array(
	z.object({
		type: z.enum(['text', 'list']),
		content: z.union([z.string(), z.array(z.string())]),
	})
);
export type FormattedRichText = z.infer<typeof formattedRichTextSchema>;

export function isFormattedRichText(
	entry: unknown
): entry is FormattedRichText {
	return isSchemaType(entry, formattedRichTextSchema, 'Rich text');
}

// RICH TEXT (CONTENTFUL)
export type RichTextNode = {
	nodeType: 'paragraph' | 'list' | 'list-item' | 'unordered-list' | 'text';
	content?: RichTextNode[];
	value?: string;
};
export function isRichTextDocument(
	obj: UnknownRecord
): obj is { nodeType: 'document'; content: RichTextNode[] } {
	return (
		'nodeType' in obj &&
		obj['nodeType'] === 'document' &&
		'content' in obj &&
		Array.isArray(obj['content'])
	);
}
