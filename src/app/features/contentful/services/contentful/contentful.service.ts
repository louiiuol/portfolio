import { inject, Injectable, resource } from '@angular/core';
import { environment } from '@env';

import { LocalStorageService } from '@shared/services';
import { createClient } from 'contentful';
import { z } from 'zod';
import { mapEntry } from '../../functions';
import {
	jobSchema,
	projectSchema,
	skillSchema,
	trainingSchema,
} from '../../types';

// Internal types, constants & schemas
const entriesSchema = z.object({
	// @todo fix the typo in "experience" key: Need to be fixed in Contentful first.
	exprience: z.array(jobSchema),
	skill: z.array(skillSchema),
	training: z.array(trainingSchema),
	project: z.array(projectSchema),
});
export type EntriesRecord = z.infer<typeof entriesSchema>;
type EntryId = keyof EntriesRecord;

export const INITIAL_ENTRIES = (): Record<EntryId, []> =>
	Object.keys(entriesSchema.shape).reduce(
		(acc, k) => {
			acc[k] = [];
			return acc;
		},
		{} as Record<EntryId, []>
	);

// Used by fetchContentfulEntries to parse only required entries
const entryIdSchema = z.enum(
	Object.keys(entriesSchema.shape) as [EntryId, ...EntryId[]]
);

@Injectable({ providedIn: 'root' })
export class ContentfulService {
	readonly entries = resource({
		loader: async () => this.getLocalEntries() ?? this.fetchContentfulEntries(),
	});

	private readonly cdaClient = createClient(environment.contentful);
	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'contentful-entries';

	private getLocalEntries(): EntriesRecord | null {
		const localEntries = this.localStorageService.get(
			this.localStorageKey,
			entriesSchema.extend({
				updatedAt: z.coerce.date(),
			})
		);

		if (!localEntries) {
			return null;
		}

		// If stored value is older than 2 weeks, return null and remove it from local storage
		const twoWeeksDuration = 1000 * 60 * 60 * 24 * 14;
		const twoWeeksAgo = Date.now() - twoWeeksDuration;

		if (new Date(localEntries.updatedAt).getTime() < twoWeeksAgo) {
			this.localStorageService.remove(this.localStorageKey);
			return null;
		}
		return localEntries;
	}

	private async fetchContentfulEntries(): Promise<EntriesRecord> {
		const { items, errors } = await this.cdaClient.getEntries();

		if (!items || errors?.length) {
			throw new Error('Aucun contenu trouvé depuis Contentful.', {
				cause: errors,
			});
		}

		const entries = items.reduce((acc: EntriesRecord, el) => {
			const key = el.sys.contentType.sys.id;
			const parsedKey = entryIdSchema.safeParse(key);
			if (parsedKey.success) {
				acc[parsedKey.data].push({
					...mapEntry(el),
					id: el.sys.id, // Sets id to contentful entry id.
				});
			}

			return acc;
		}, INITIAL_ENTRIES());

		this.localStorageService.set(this.localStorageKey, {
			...entries,
			updatedAt: new Date(),
		});

		return entries;
	}
}
