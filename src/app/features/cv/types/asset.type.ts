import { entrySchema } from '@feat/contentfull/types';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';

// ASSET
export const assetSchema = entrySchema.extend({
	title: z.string(),
	description: z.string().optional(),
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
export const isAsset = (entry: unknown): entry is Asset =>
	isSchemaType(entry, assetSchema, 'Asset');
