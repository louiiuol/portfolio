import { validAsset } from '../../mocks/asset.mock';
import { assetSchema } from './asset.type';

describe('Asset', () => {
	describe('assetSchema', () => {
		it('should return true for valid asset type', () => {
			expect(assetSchema.safeParse(validAsset).success).toBe(true);
		});

		it('should return false for invalid asset type', () => {
			expect(assetSchema.safeParse({ ...validAsset, file: null }).success).toBe(
				false
			);
		});
	});
});
