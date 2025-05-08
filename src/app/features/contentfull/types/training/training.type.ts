import { z } from 'zod';
import { diplomaSchema } from '../diploma/diploma.type';
import { entrySchema } from '../entry.type';
import { placeSchema } from '../place/place.type';

export const trainingSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	diplomas: z.array(diplomaSchema),
	school: placeSchema,
});
export type TrainingEntry = z.infer<typeof trainingSchema>;
