import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { assetSchema } from './asset.type';
import { entrySchema } from './entry.type';

// COMPANY
export const companySchema = entrySchema.extend({
	name: z.string(),
	city: z.string(),
	country: z.string(),
	logo: assetSchema,
	url: z.string().optional(),
});
export type Company = z.infer<typeof companySchema>;

export const isCompany = (entry: unknown): entry is Company =>
	isSchemaType(entry, companySchema, 'Company');
