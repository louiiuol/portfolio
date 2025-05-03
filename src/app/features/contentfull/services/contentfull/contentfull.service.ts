import { inject, Injectable, resource } from '@angular/core';
import { environment } from '@env';

import {
	diplomaSchema,
	jobSchema,
	placeSchema,
	skillSchema,
} from '@feat/cv/types';
import { trainingSchema } from '@feat/cv/types/training/training.type';
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
export type EntriesRecord = z.infer<typeof entriesSchema>;

export const INITIAL_ENTRIES = () => ({
	exprience: [],
	skill: [],
	company: [],
	school: [],
	diploma: [],
	training: [],
});

@Injectable({ providedIn: 'root' })
export class ContentfullService {
	readonly contentResource = resource({
		loader: async () =>
			(await this.getLocalEntries()) ?? this.fetchContentfullEntries(),
	});

	private readonly cdaClient = createClient(environment.contenftull);
	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'contentfull-entries';

	private async getLocalEntries(): Promise<EntriesRecord | null> {
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
		const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;
		if (new Date(localEntries.updatedAt).getTime() < twoWeeksAgo) {
			this.localStorageService.remove(this.localStorageKey);
			return null;
		}

		await sleep(1000);
		return localEntries;
	}

	private async fetchContentfullEntries(): Promise<EntriesRecord> {
		const { items, errors } = await this.cdaClient.getEntries();

		if (!items || errors?.length) {
			throw new Error('Aucun contenu trouvé depuis Contentfull.', {
				cause: errors,
			});
		}

		const entries = items.reduce((acc: EntriesRecord, el) => {
			const key = el.sys.contentType.sys.id as
				| 'exprience'
				| 'skill'
				| 'company'
				| 'school'
				| 'diploma';

			acc[key].push({
				...mapEntry(el),
				id: el.sys.id, // @todo improve the type of the entry (one type for each entry)
			});
			return acc;
		}, INITIAL_ENTRIES());

		this.localStorageService.set(this.localStorageKey, {
			...entries,
			updatedAt: new Date(),
		});

		return entries;
	}
}
