import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';
import { entrySchema } from '../entry.type';

export const placeSchema = entrySchema.extend({
	name: z.string(),
	city: z.string(),
	country: z.string(),
	description: z.string(),
	logo: assetSchema,
	url: z.string().nullish(),
});
export type Place = z.infer<typeof placeSchema>;
