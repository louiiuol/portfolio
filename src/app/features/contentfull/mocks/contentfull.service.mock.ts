// mocks/mock-contentfull.service.ts
import { Injectable, resource } from '@angular/core';
import type { Diploma, Place, Skill } from '../../cv/types';
import type { JobEntry } from '../../cv/types/job/job.type';
import type { TrainingEntry } from '../../cv/types/training/training.type';
import type { EntriesRecord } from '../services/contentfull/contentfull.service';

@Injectable()
export class MockContentfullService {
	/** Internal source */
	private readonly _data = Promise.resolve({
		exprience: [] as JobEntry[],
		skill: [] as Skill[],
		company: [] as Place[],
		school: [] as Place[],
		diploma: [] as Diploma[],
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
