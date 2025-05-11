import { Injectable } from '@angular/core';
import { formatZodError, safeParse } from '@shared/functions';
import { isNullish, isPrimitive } from '@shared/types';
import { ZodError, type z, type ZodType, type ZodTypeDef } from 'zod';

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

		try {
			return schema.parse(content);
		} catch (error) {
			if (error instanceof ZodError) {
				console.error(formatZodError(error, 'Récupération des entrées'));
			}
			return null;
		}
	};

	check = (key: string) => !!localStorage.getItem(key);

	remove = (key: string) => localStorage.removeItem(key);
}
