import { isUnknownRecord, type UnknownRecord } from '@shared/types';
import type { FormattedRichText, RichTextNode } from '../../types';
import { isRichTextDocument } from '../../types';
import { hasFields } from '../has-field/has-field.fn';

/**
 * Recursively maps an entry to an inferred type.
 *
 * Formats all nested array, objects (with fields property), and rich text document according to Contentful schemas.
 * @param entry - the entry to map
 * @returns the mapped entry
 * @see FormattedRichText for more information on IO structures
 */
export function mapEntry<T>(entry: unknown): T {
	// @todo improve the type of the entry
	if (Array.isArray(entry)) {
		return entry.map(item => mapEntry<T>(item)) as T;
	}
	if (isUnknownRecord(entry)) {
		if (hasFields(entry)) {
			return mapEntry<T>(entry.fields);
		}
		if (isRichTextDocument(entry)) {
			return mapRichTextNodes(entry.content) as T;
		}
		return mapObject(entry) as T;
	}
	return entry as T;
}

export const mapObject = (obj: UnknownRecord): UnknownRecord =>
	Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, mapEntry(value)])
	);

export function mapRichTextNodes(nodes: RichTextNode[]): FormattedRichText {
	return nodes.flatMap(node => mapRichTextNode(node));
}

export function mapRichTextNode(node: RichTextNode): FormattedRichText {
	if (node.nodeType === 'text' && node.value) {
		return [{ type: 'text', content: node.value }];
	}
	if (node.nodeType === 'paragraph' || node.nodeType === 'list-item') {
		const content = node.content ? mapRichTextNodes(node.content) : [];
		return [
			{
				type: 'text',
				content: content
					.map(c =>
						(Array.isArray(c.content) ? c.content.join(' ') : c.content).trim()
					)
					.join(' ')
					.replace(/\s{2,}/g, ' '), // remove double spaces due to previous join
			},
		];
	}
	if (node.nodeType === 'unordered-list') {
		const listItems = node.content ? mapRichTextNodes(node.content) : [];
		return [
			{
				type: 'list',
				content: listItems
					.filter(
						(i): i is { content: string | string[]; type: 'text' | 'list' } =>
							'content' in i &&
							['text', 'list'].includes(i.type) &&
							['string', 'array'].includes(typeof i.content)
					)
					.map(item =>
						Array.isArray(item.content) ? item.content.join(' ') : item.content
					),
			},
		];
	}
	return [];
}
