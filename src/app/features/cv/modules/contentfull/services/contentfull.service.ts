import { computed, inject, Injectable, resource } from '@angular/core';
import { environment } from '@env';
import {
	type Company,
	isJob,
	isSkill,
	type Job,
	type Skill,
} from '@feat/cv/types';
import { sleep } from '@shared/functions';
import { LocalStorageService } from '@shared/services/local-storage.service';
import {
	isUnknownRecord,
	type UnknownRecord,
} from '@shared/types/unknown-record.type';
import { createClient } from 'contentful';
import { isRichTextDocument } from '../types/rich-text.type';
import { RichTextService } from './rich-text.service';

// Internal types
type ContentTypeId = 'exprience' | 'skill' | 'company';
const entriesRecord: {
	exprience: Job[];
	skill: Skill[];
	company: Company[];
} = {
	exprience: [],
	skill: [],
	company: [],
} as const;
type EntriesRecord = typeof entriesRecord;
type StoredEntriesRecord = (EntriesRecord & { updatedAt: Date }) | null;

@Injectable()
export class ContentfullService {
	readonly jobs = computed(() =>
		(this.contentResource.value()?.exprience ?? []).filter(isJob)
	);

	readonly skills = computed(() =>
		(this.contentResource.value()?.skill ?? []).filter(isSkill)
	);

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
					...this.processEntry(el),
					id: el.sys.id, // @todo improve the type of the entry (one type for each entry)
				});
				return acc;
			}, entriesRecord);
			this.setLocalEntries(entries);
			return entries;
		},
	});

	private readonly cdaClient = createClient(environment.contenftull);
	private readonly richTextService = inject(RichTextService);
	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'contentfull-entries';

	private setLocalEntries(entries: EntriesRecord) {
		this.localStorageService.setItem<StoredEntriesRecord>(
			this.localStorageKey,
			{
				...entries,
				updatedAt: new Date(),
			}
		);
	}

	private getLocalEntries(): EntriesRecord | null {
		const localEntries = this.localStorageService.getItem<StoredEntriesRecord>(
			this.localStorageKey
		);
		const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;
		if (new Date(localEntries?.updatedAt ?? 0).getTime() < twoWeeksAgo) {
			return null;
		}
		return localEntries;
	}

	// @todo improve the type of the entry
	private processEntry<T>(entry: unknown): T {
		if (Array.isArray(entry)) {
			return entry.map(item => this.processEntry<T>(item)) as T;
		}
		if (isUnknownRecord(entry)) {
			if (this.hasFields(entry)) {
				return this.processEntry<T>(entry.fields);
			}
			if (isRichTextDocument(entry)) {
				return this.richTextService.processRichTextNodes(entry.content) as T;
			}
			return this.processObject(entry) as T;
		}
		return entry as T;
	}

	private hasFields(record: UnknownRecord): record is { fields: unknown[] } {
		return 'fields' in record;
	}

	private processObject(obj: UnknownRecord): UnknownRecord {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [key, this.processEntry(value)])
		);
	}
}
