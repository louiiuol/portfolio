import {
	formattedRichTextSchema,
	isFormattedRichText,
	isRichTextDocument,
} from './rich-text.type';

describe('Rich Text Type Tests', () => {
	describe('isFormattedRichText', () => {
		it('should return true for valid formatted rich text', () => {
			const validEntry = [
				{ type: 'text', content: 'Sample text' },
				{ type: 'list', content: ['Item 1', 'Item 2'] },
			];
			expect(isFormattedRichText(validEntry)).toBe(true);
		});

		it('should return false for invalid formatted rich text', () => {
			const invalidEntry = [
				{ type: 'invalid', content: 'Sample text' },
				{ type: 'list', content: 'Not an array' },
			];
			expect(isFormattedRichText(invalidEntry)).toBe(false);
		});
	});

	describe('isRichTextDocument', () => {
		it('should return true for a valid rich text document', () => {
			const validDocument = {
				nodeType: 'document',
				content: [
					{ nodeType: 'paragraph', content: [], value: 'Sample paragraph' },
					{
						nodeType: 'list',
						content: [{ nodeType: 'list-item', value: 'Item 1' }],
					},
				],
			};
			expect(isRichTextDocument(validDocument)).toBe(true);
		});

		it('should return false for an invalid rich text document', () => {
			const invalidDocument = {
				nodeType: 'invalid',
				content: 'Not an array',
			};
			expect(isRichTextDocument(invalidDocument)).toBe(false);
		});
	});

	describe('formattedRichTextSchema', () => {
		it('should validate a correct formatted rich text schema', () => {
			const validEntry = [
				{ type: 'text', content: 'Sample text' },
				{ type: 'list', content: ['Item 1', 'Item 2'] },
			];
			expect(() => formattedRichTextSchema.parse(validEntry)).not.toThrow();
		});

		it('should throw an error for an incorrect formatted rich text schema', () => {
			const invalidEntry = [
				{ type: 'invalid', content: 'Sample text' },
				{ type: 'list', content: 'Not an array' },
			];
			expect(() => formattedRichTextSchema.parse(invalidEntry)).toThrow();
		});
	});
});
