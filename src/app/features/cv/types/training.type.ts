import { entrySchema } from '@feat/contentfull/types';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { placeSchema } from './company.type';
import { diplomaSchema } from './diploma.type';

export const trainingSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	diplomas: z.array(diplomaSchema),
	school: placeSchema,
});
export type Training = z.infer<typeof trainingSchema>;
export type TrainingField = keyof Training;
export const isTraining = (entry: unknown): entry is Training =>
	isSchemaType(entry, trainingSchema, 'Training');
