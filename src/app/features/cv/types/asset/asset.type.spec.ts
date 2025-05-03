import { validAsset } from '../../mocks/asset.mock';
import { isAsset } from './asset.type';

describe('Asset', () => {
	describe('isAsset', () => {
		it('should return true for valid asset type', () => {
			expect(isAsset(validAsset)).toBe(true);
		});

		it('should return false for invalid asset type', () => {
			expect(isAsset({ ...validAsset, file: null })).toBe(false);
		});
	});
});
