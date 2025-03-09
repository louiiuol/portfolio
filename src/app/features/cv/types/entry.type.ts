import { z } from 'zod';

// BASE ENTRY
export const entrySchema = z.object({
	id: z.string().nullish(),
});
