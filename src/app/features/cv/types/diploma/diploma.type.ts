import { entrySchema } from '@feat/contentfull/types';
import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { skillSchema } from '../skill/skill.type';

export const diplomaSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	obtainedAt: z.coerce.date(),
	skills: z.array(skillSchema),
	// assets: z.array(assetSchema).nullish(),
});
export type Diploma = z.infer<typeof diplomaSchema>;
export type DiplomaField = keyof Diploma;
export const isDiploma = (entry: unknown): entry is Diploma =>
	isSchemaType(entry, diplomaSchema, 'Diploma');
