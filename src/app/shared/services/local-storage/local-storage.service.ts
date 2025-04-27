import { Injectable } from '@angular/core';
import type { z, ZodType } from 'zod';
import type { nullish } from '../../types';
import { isNotNullish, isPrimitive } from '../../types';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	set = (key: string, value: unknown) => {
		const toStore: string = isPrimitive(value)
			? String(value)
			: JSON.stringify(value);
		localStorage.setItem(key, toStore);
	};

	get = <
		Output,
		Input = Output,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Schema extends ZodType<Output, any, Input> = ZodType<Output, any, Input>,
	>(
		key: string,
		schema: Schema
	): z.infer<Schema> | null => {
		const content = this.safeParseRaw(localStorage.getItem(key));

		if (!isNotNullish(content)) {
			return null;
		}

		const result = schema.safeParse(content);

		if (result.success) {
			return result.data; // TypeScript sait que c'est z.infer<Schema>
		}
		console.error(
			"Une erreur est survenue lors de la récupération de l'objet :",
			result.error
		);
		return null;
	};

	check = (key: string) => !!localStorage.getItem(key);

	remove = (key: string) => localStorage.removeItem(key);

	private readonly safeParseRaw = (raw: string | nullish): unknown => {
		if (raw === null || raw === undefined) {
			return null;
		}
		try {
			return JSON.parse(raw);
		} catch {
			// C'était un primitive simple (string/number/boolean) pas un JSON
			return raw;
		}
	};
}
