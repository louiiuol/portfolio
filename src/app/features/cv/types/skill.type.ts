import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { entrySchema } from '../modules/contentfull/types/entry.type';
import { assetSchema } from './asset.type';

// SKILL
export const skillSchema = entrySchema.extend({
	name: z.string(),
	description: z.string().optional(),
	level: z.enum(['débutant', 'intermédiaire', 'avancé', 'expert']),
	icon: assetSchema.nullish(),
});
export type Skill = z.infer<typeof skillSchema>;
export const isSkill = (entry: unknown): entry is Skill =>
	isSchemaType(entry, skillSchema, 'Skill');
