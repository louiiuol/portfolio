import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { entrySchema } from '../modules/contentfull/types/entry.type';
import { diplomaSchema } from './diploma.type';

export const schoolSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	diplomas: z.array(diplomaSchema),
	city: z.string(),
});
export type School = z.infer<typeof schoolSchema>;
export type SchoolField = keyof School;
export const isSchool = (entry: unknown): entry is School =>
	isSchemaType(entry, schoolSchema, 'School');
