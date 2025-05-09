import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';
import { entrySchema } from '../entry.type';

export const skillSchema = entrySchema.extend({
	name: z.string(),
	description: z.string().nullish(),
	level: z.enum(['débutant', 'intermédiaire', 'avancé', 'expert']),
	icon: assetSchema.nullish(),
});
export type SkillEntry = z.infer<typeof skillSchema>;

export const isSkill = (entry: unknown): entry is SkillEntry =>
	isSchemaType(entry, skillSchema, 'SkillEntry');
