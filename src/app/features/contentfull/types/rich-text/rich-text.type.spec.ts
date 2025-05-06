import {
	invalidDocument,
	invalidFormattedRichText,
	validDocument,
	validFormattedRichText,
} from '../../mocks/rich-text.mock';
import {
	formattedRichTextSchema,
	isFormattedRichText,
	isRichTextDocument,
} from './rich-text.type';

describe('Rich Text Type Tests', () => {
	describe('isFormattedRichText', () => {
		it('should return true for valid formatted rich text', () => {
			expect(isFormattedRichText(validFormattedRichText)).toBe(true);
		});

		it('should return false for invalid formatted rich text', () => {
			expect(isFormattedRichText(invalidFormattedRichText)).toBe(false);
		});
	});

	describe('isRichTextDocument', () => {
		it('should return true for a valid rich text document', () => {
			expect(isRichTextDocument(validDocument)).toBe(true);
		});

		it('should return false for an invalid rich text document', () => {
			expect(isRichTextDocument(invalidDocument)).toBe(false);
		});
	});

	describe('formattedRichTextSchema', () => {
		it('should validate a correct formatted rich text schema', () => {
			expect(() =>
				formattedRichTextSchema.parse(validFormattedRichText)
			).not.toThrow();
		});

		it('should throw an error for an incorrect formatted rich text schema', () => {
			expect(() =>
				formattedRichTextSchema.parse(invalidFormattedRichText)
			).toThrow();
		});
	});
});
