import { Injectable } from '@angular/core';
import { safeParse } from '@shared/functions';
import { isNullish, isPrimitive } from '@shared/types';
import type { z, ZodType, ZodTypeDef } from 'zod';

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
		Schema extends ZodType<Output, ZodTypeDef, Input> = ZodType<
			Output,
			ZodTypeDef,
			Input
		>,
	>(
		key: string,
		schema: Schema
	): z.infer<Schema> | null => {
		const content = safeParse(localStorage.getItem(key));

		if (isNullish(content)) {
			return null;
		}

		const validator = schema.safeParse(content);

		if (!validator.success) {
			console.error(
				"Une erreur est survenue lors de la récupération de l'objet :",
				validator.error
			);
			return null;
		}

		return validator.data; // TypeScript infers via z.infer<Schema> here
	};

	check = (key: string) => !!localStorage.getItem(key);

	remove = (key: string) => localStorage.removeItem(key);
}
