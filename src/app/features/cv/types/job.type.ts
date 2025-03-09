import { isSchemaType } from '@shared/fns/type-checker/is-schema-type.fn';
import { z } from 'zod';
import { formattedRichTextSchema } from '../modules/contentfull/types/rich-text.type';
import { assetSchema } from './asset.type';
import { companySchema } from './company.type';
import { entrySchema } from './entry.type';
import { skillSchema } from './skill.type';

// JOB
export const jobSchema = entrySchema.extend({
	company: companySchema,
	remotePolicy: z.enum(['à distance', 'hybride', 'sur site']),
	contractType: z.enum(['cdi', 'cdd', 'freelance', 'alternance', 'stage']),
	title: z.string(),
	description: formattedRichTextSchema,
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullish(),
	assets: z.array(assetSchema).nullish(),
	skills: z.array(skillSchema),
});
export type Job = z.infer<typeof jobSchema>;
export const isJob = (entry: unknown): entry is Job =>
	isSchemaType(entry, jobSchema, 'Job');
