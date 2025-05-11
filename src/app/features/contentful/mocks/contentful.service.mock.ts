// mocks/mock-contentful.service.ts
import { Injectable, resource } from '@angular/core';
import type { EntriesRecord } from '../services/contentful/contentful.service';
import type {
	DiplomaEntry,
	JobEntry,
	PlaceEntry,
	SkillEntry,
	TrainingEntry,
} from '../types';

@Injectable()
export class MockContentfulService {
	/** Internal source */
	private readonly _data = Promise.resolve({
		exprience: [] as JobEntry[],
		skill: [] as SkillEntry[],
		company: [] as PlaceEntry[],
		school: [] as PlaceEntry[],
		diploma: [] as DiplomaEntry[],
		training: [] as TrainingEntry[],
	});

	/** Resource used by components */
	readonly contentResource = resource({
		// No need for reactive query in tests
		loader: async () => Promise.resolve(this._data),
	});

	/* Helpers for the tests */
	setData(entries: EntriesRecord) {
		(this._data as Promise<unknown>) = Promise.resolve(entries);
		this.contentResource.reload(); //  properly reload the resource
	}
}
