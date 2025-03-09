import { Injectable } from '@angular/core';
import type { FormattedRichText, RichTextNode } from '../types/rich-text.type';

@Injectable()
export class RichTextService {
	processRichTextNodes(nodes: RichTextNode[]): FormattedRichText {
		return nodes.flatMap(node => this.processRichTextNode(node));
	}

	processRichTextNode(node: RichTextNode): FormattedRichText {
		if (node.nodeType === 'text' && node.value) {
			return [{ type: 'text', content: node.value }];
		}
		if (node.nodeType === 'paragraph' || node.nodeType === 'list-item') {
			const content = node.content
				? this.processRichTextNodes(node.content)
				: [];
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
			const listItems = node.content
				? this.processRichTextNodes(node.content)
				: [];
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
}
