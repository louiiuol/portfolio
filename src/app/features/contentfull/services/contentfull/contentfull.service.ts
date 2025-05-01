import { inject, Injectable, resource } from '@angular/core';
import { environment } from '@env';

import {
	diplomaSchema,
	jobSchema,
	placeSchema,
	skillSchema,
} from '@feat/cv/types';
import { trainingSchema } from '@feat/cv/types/training.type';
import { sleep } from '@shared/functions';
import { LocalStorageService } from '@shared/services';
import { createClient } from 'contentful';
import { z } from 'zod';
import { mapEntry } from '../../functions';

// Internal types, constants & schemas
const entriesSchema = z.object({
	exprience: z.array(jobSchema),
	skill: z.array(skillSchema),
	company: z.array(placeSchema),
	school: z.array(placeSchema),
	diploma: z.array(diplomaSchema),
	training: z.array(trainingSchema),
});
type EntriesRecord = z.infer<typeof entriesSchema>;

type ContentTypeId = 'exprience' | 'skill' | 'company' | 'school' | 'diploma';
const entriesRecord: EntriesRecord = {
	exprience: [],
	skill: [],
	company: [],
	school: [],
	diploma: [],
	training: [],
} as const;

@Injectable()
export class ContentfullService {
	readonly contentResource = resource({
		loader: async () => {
			const localEntries = this.getLocalEntries();
			await sleep(1000);
			if (localEntries) {
				return Promise.resolve(localEntries);
			}
			const { items } = await this.cdaClient.getEntries();
			const entries = items.reduce((acc: EntriesRecord, el) => {
				const key = el.sys.contentType.sys.id as ContentTypeId;
				acc[key].push({
					...mapEntry(el),
					id: el.sys.id, // @todo improve the type of the entry (one type for each entry)
				});
				return acc;
			}, entriesRecord);
			this.localStorageService.set(this.localStorageKey, {
				...entries,
				updatedAt: new Date(),
			});
			return entries;
		},
	});

	private readonly cdaClient = createClient(environment.contenftull);
	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'contentfull-entries';

	private getLocalEntries(): EntriesRecord | null {
		const localEntries = this.localStorageService.get(
			this.localStorageKey,
			entriesSchema.extend({
				updatedAt: z.date(),
			})
		);

		if (!localEntries) {
			return null;
		}

		// If stored value is older than 2 weeks, return null and remove it from local storage
		const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;
		if (new Date(localEntries.updatedAt).getTime() < twoWeeksAgo) {
			this.localStorageService.remove(this.localStorageKey);
			return null;
		}

		return localEntries;
	}
}
