// mocks/mock-contentfull.service.ts
import { Injectable, resource } from '@angular/core';
import type { EntriesRecord } from '../services/contentfull/contentfull.service';

@Injectable()
export class MockContentfullService {
	/** Internal source */
	private readonly _data = new Promise(() => ({
		exprience: [],
		skill: [],
		company: [],
		school: [],
		diploma: [],
		training: [],
	}));

	/** Resource used by components */
	readonly contentResource = resource({
		// Pas besoin de requête réactive côté test
		loader: async () => Promise.resolve(this._data),
	});

	/* Helpers for the tests */
	setData(entries: EntriesRecord) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this._data as any) = new Promise(() => entries);
		this.contentResource.reload(); // on relance proprement le resource
	}
}
