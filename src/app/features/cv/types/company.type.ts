import { entrySchema } from '@feat/contentfull/types/entry.type';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { assetSchema } from './asset.type';

// COMPANY
export const placeSchema = entrySchema.extend({
	name: z.string(),
	city: z.string(),
	country: z.string(),
	description: z.string(),
	logo: assetSchema,
	url: z.string().optional(),
});
export type Place = z.infer<typeof placeSchema>;

export const isPlace = (entry: unknown): entry is Place =>
	isSchemaType(entry, placeSchema, 'Place');
