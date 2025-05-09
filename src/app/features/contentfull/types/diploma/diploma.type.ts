import { z } from 'zod';
import { entrySchema } from '../entry.type';
import { skillSchema } from '../skill/skill.type';

export const diplomaSchema = entrySchema.extend({
	name: z.string(),
	description: z.string(),
	obtainedAt: z.coerce.date(),
	skills: z.array(skillSchema),
	// assets: z.array(assetSchema).nullish(),
});
export type DiplomaEntry = z.infer<typeof diplomaSchema>;
