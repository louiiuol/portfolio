import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { entrySchema } from '../modules/contentfull/types/entry.type';
import { assetSchema } from './asset.type';

// COMPANY
export const companySchema = entrySchema.extend({
	name: z.string(),
	city: z.string(),
	country: z.string(),
	description: z.string(),
	logo: assetSchema,
	url: z.string().optional(),
});
export type Company = z.infer<typeof companySchema>;

export const isCompany = (entry: unknown): entry is Company =>
	isSchemaType(entry, companySchema, 'Company');
