import { isUnknownRecord, type UnknownRecord } from '@shared/types';
import type { FormattedRichText, RichTextNode } from '../../types';
import { isRichTextDocument } from '../../types';
import { hasFields } from '../has-field/has-field.fn';

/**
 * Recursively maps an entry to an inferred type.
 * @param entry - the entry to map
 * @returns the mapped entry
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
						Array.isArray(c.content) ? c.content.join(' ') : c.content
					)
					.join(' '),
			},
		];
	}
	if (node.nodeType === 'unordered-list') {
		const listItems = node.content ? mapRichTextNodes(node.content) : [];
		return [
			{
				type: 'list',
				content: listItems.map(item =>
					Array.isArray(item.content) ? item.content.join(' ') : item.content
				),
			},
		];
	}
	return [];
}
