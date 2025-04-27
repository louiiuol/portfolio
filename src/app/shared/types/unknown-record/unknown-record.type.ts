import { isNotNullish } from '../nullish/nullish.type';

export type UnknownRecord = Record<
	string | number,
	string | number | boolean | null | object | Array<unknown> | undefined
>;

export function isUnknownRecord(obj: unknown): obj is UnknownRecord {
	return !Array.isArray(obj) && typeof obj === 'object' && isNotNullish(obj);
}
