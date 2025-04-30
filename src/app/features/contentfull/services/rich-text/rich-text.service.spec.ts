import { TestBed } from '@angular/core/testing';
import type { RichTextNode } from '../../types/rich-text/rich-text.type';
import { RichTextService } from './rich-text.service';

describe('RichTextService', () => {
	let service: RichTextService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RichTextService],
		});
		service = TestBed.inject(RichTextService);
	});

	it('should process text nodes correctly', () => {
		const nodes: RichTextNode[] = [{ nodeType: 'text', value: 'Hello World' }];
		const result = service.processRichTextNodes(nodes);
		expect(result).toEqual([{ type: 'text', content: 'Hello World' }]);
	});

	it('should process paragraph nodes correctly', () => {
		const nodes: RichTextNode[] = [
			{
				nodeType: 'paragraph',
				content: [
					{ nodeType: 'text', value: 'Hello' },
					{ nodeType: 'text', value: 'World' },
				],
			},
		];
		const result = service.processRichTextNodes(nodes);
		expect(result).toEqual([{ type: 'text', content: 'Hello World' }]);
	});

	it('should process unordered list nodes correctly', () => {
		const nodes: RichTextNode[] = [
			{
				nodeType: 'unordered-list',
				content: [
					{
						nodeType: 'list-item',
						content: [{ nodeType: 'text', value: 'Item 1' }],
					},
					{
						nodeType: 'list-item',
						content: [{ nodeType: 'text', value: 'Item 2' }],
					},
				],
			},
		];
		const result = service.processRichTextNodes(nodes);
		expect(result).toEqual([{ type: 'list', content: ['Item 1', 'Item 2'] }]);
	});

	it('should return an empty array for unsupported node types', () => {
		const nodes: RichTextNode[] = [
			{ nodeType: 'unsupported' as any, value: 'Ignored' },
		];
		const result = service.processRichTextNodes(nodes);
		expect(result).toEqual([]);
	});

	it('should handle empty content gracefully', () => {
		const nodes: RichTextNode[] = [{ nodeType: 'paragraph', content: [] }];
		const result = service.processRichTextNodes(nodes);
		expect(result).toEqual([{ type: 'text', content: '' }]);
	});
});
