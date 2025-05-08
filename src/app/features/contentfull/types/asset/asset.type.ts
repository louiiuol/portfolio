import { z } from 'zod';
import { entrySchema } from '../entry.type';

// ASSET
export const assetSchema = entrySchema.extend({
	title: z.string(),
	description: z.string().nullish(),
	file: z.object({
		url: z.string(),
		details: z.object({
			size: z.number(),
			image: z.object({
				width: z.number(),
				height: z.number(),
			}),
		}),
		fileName: z.string(),
		contentType: z.string(),
	}),
});
export type Asset = z.infer<typeof assetSchema>;
