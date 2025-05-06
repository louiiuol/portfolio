import { entrySchema } from '@feat/contentfull/types';
import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';

// COMPANY
export const placeSchema = entrySchema.extend({
	name: z.string(),
	city: z.string(),
	country: z.string(),
	description: z.string(),
	logo: assetSchema,
	url: z.string().nullish(),
});
export type Place = z.infer<typeof placeSchema>;
