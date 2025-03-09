import { Injectable } from '@angular/core';

// @todo make it type safe
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	getItem<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item) as T;
		}
		return null;
	}

	setItem<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}
}
