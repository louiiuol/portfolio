/* -------------------------------------------------------------
 * map-functions.spec.ts
 * ------------------------------------------------------------- */

import type { UnknownRecord } from '../../../../shared/types';
import type { RichTextNode } from '../../types';
import {
	mapEntry,
	mapObject,
	mapRichTextNode,
	mapRichTextNodes,
} from './map-entry.fn';

describe('map-* helpers', () => {
	/* ------------------------------------------------------------------ *
	 *  mapObject
	 * ------------------------------------------------------------------ */
	describe('mapObject()', () => {
		it('recursively maps every value and keeps the original keys', () => {
			const input: UnknownRecord = {
				a: 1,
				b: { c: 2, d: { e: 3 } }, // nested object
			};

			const out = mapObject(input);

			expect(out).toEqual({
				a: 1,
				b: { c: 2, d: { e: 3 } },
			});
			expect(out).not.toBe(input); // new reference
			expect(out['b']).not.toBe(input['b']);
		});
	});

	/* ------------------------------------------------------------------ *
	 *  mapEntry
	 * ------------------------------------------------------------------ */
	describe('mapEntry()', () => {
		it('returns arrays deeply mapped (idempotent for primitives)', () => {
			const src = [1, [2, 3]];
			const out = mapEntry<typeof src>(src);
			expect(out).toEqual(src);
		});

		it('extracts and maps the `.fields` property when present', () => {
			const entry: UnknownRecord = { fields: { answer: 42 } };
			const out = mapEntry<typeof entry.fields>(entry);
			expect(out).toEqual({ answer: 42 });
		});

		it('converts a valid Contentful rich-text *document*', () => {
			const doc: UnknownRecord = {
				nodeType: 'document',
				content: [
					{ nodeType: 'text', value: 'Hello' },
					{
						nodeType: 'paragraph',
						content: [{ nodeType: 'text', value: 'world' }],
					},
				],
			};

			const out = mapEntry(doc);
			expect(out).toEqual([
				{ type: 'text', content: 'Hello' },
				{ type: 'text', content: 'world' },
			]);
		});

		it('returns primitives untouched', () => {
			expect(mapEntry('foo')).toBe('foo');
			expect(mapEntry(99)).toBe(99);
			expect(mapEntry(true)).toBe(true);
			expect(mapEntry(null)).toBeNull();
		});
	});

	/* ------------------------------------------------------------------ *
	 *  mapRichTextNode / mapRichTextNodes
	 * ------------------------------------------------------------------ */
	describe('Rich-text helpers', () => {
		it('transforms a simple text node', () => {
			const node: RichTextNode = { nodeType: 'text', value: 'alpha' };
			expect(mapRichTextNode(node)).toEqual([
				{ type: 'text', content: 'alpha' },
			]);
		});

		it('flattens and joins child text inside a paragraph', () => {
			const p: RichTextNode = {
				nodeType: 'paragraph',
				content: [
					{ nodeType: 'text', value: 'foo' },
					{ nodeType: 'text', value: 'bar' },
				],
			};
			expect(mapRichTextNode(p)).toEqual([
				{ type: 'text', content: 'foo bar' },
			]);
		});

		it('converts an unordered list to a {type:"list"} array', () => {
			const ul: RichTextNode = {
				nodeType: 'unordered-list',
				content: [
					{
						nodeType: 'list-item',
						content: [{ nodeType: 'text', value: 'One' }],
					},
					{
						nodeType: 'list-item',
						content: [{ nodeType: 'text', value: 'Two' }],
					},
				],
			};
			expect(mapRichTextNode(ul)).toEqual([
				{ type: 'list', content: ['One', 'Two'] },
			]);
		});

		it('returns an empty array for unsupported node types', () => {
			const unsupported = {
				nodeType: 'asset',
				content: [],
			} as unknown as RichTextNode;
			expect(mapRichTextNode(unsupported)).toEqual([]);
		});

		it('mapRichTextNodes() flattens a heterogenous list of nodes', () => {
			const nodes: RichTextNode[] = [
				{ nodeType: 'text', value: 'Hi' },
				{
					nodeType: 'paragraph',
					content: [{ nodeType: 'text', value: 'there' }],
				},
			];

			expect(mapRichTextNodes(nodes)).toEqual([
				{ type: 'text', content: 'Hi' },
				{ type: 'text', content: 'there' },
			]);
		});
	});
});
