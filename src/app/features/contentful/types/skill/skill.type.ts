import { isSchemaType } from '@shared/functions';
import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';
import { entrySchema } from '../entry.type';

export const SKILL_LEVELS = [
	'débutant',
	'intermédiaire',
	'avancé',
	'expert',
] as const;
export const getSkillLevelWeight = (level: (typeof SKILL_LEVELS)[number]) =>
	SKILL_LEVELS.indexOf(level);

export const skillSchema = entrySchema.extend({
	name: z.string(),
	description: z.string().nullish(),
	level: z.enum(SKILL_LEVELS),
	icon: assetSchema.nullish(),
});
export type SkillEntry = z.infer<typeof skillSchema>;

export const isSkill = (entry: unknown): entry is SkillEntry =>
	isSchemaType(entry, skillSchema, 'SkillEntry');
