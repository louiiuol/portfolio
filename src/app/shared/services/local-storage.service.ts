import { Injectable } from '@angular/core';

// @todo make it type safe: safeParse with branded types
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	//@todo safeGet using zod schemas (as param)
	getItem<T>(key: string): T | null {
		if (typeof window !== 'undefined' && window.localStorage) {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		}
		return null;
	}

	setItem<T>(key: string, value: T): void {
		if (typeof window !== 'undefined' && window.localStorage) {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	}

	removeItem(key: string): void {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.removeItem(key);
		}
	}
}
