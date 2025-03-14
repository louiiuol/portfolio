import { isNotNullish } from './nullish.type';

export type UnknownRecord = Record<
	string | number,
	string | number | boolean | null | object | Array<unknown> | undefined
>;

export function isUnknownRecord(obj: unknown): obj is UnknownRecord {
	return typeof obj === 'object' && isNotNullish(obj);
}
