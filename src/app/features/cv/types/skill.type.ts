import { isSchemaType } from '@shared/fns/type-checker/is-schema-type.fn';
import { z } from 'zod';
import { assetSchema } from './asset.type';
import { entrySchema } from './entry.type';

// SKILL
export const skillSchema = entrySchema.extend({
	name: z.string(),
	description: z.string().optional(),
	level: z.enum(['débutant', 'intermédiaire', 'avancé', 'expert']),
	icon: assetSchema,
});
export type Skill = z.infer<typeof skillSchema>;
export const isSkill = (entry: unknown): entry is Skill =>
	isSchemaType(entry, skillSchema, 'Skill');
