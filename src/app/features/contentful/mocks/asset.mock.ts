import type { AssetEntry } from '../types';

export const validAsset: AssetEntry = {
	title: 'Test Asset',
	description: 'This is a test asset',
	file: {
		url: 'http://example.com/test.jpg',
		details: {
			size: 12345,
			image: {
				width: 800,
				height: 600,
			},
		},
		fileName: 'test.jpg',
		contentType: 'image/jpeg',
	},
};
