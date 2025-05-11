import { z } from 'zod';

// export const entryIdBrand = z.string().brand('entryId');
// export type EntryId = z.infer<typeof entryIdBrand>;

// BASE ENTRY
export const entrySchema = z.object({
	id: z.string().nullish(), // Must be nullish because nested objects don't have an id
});
