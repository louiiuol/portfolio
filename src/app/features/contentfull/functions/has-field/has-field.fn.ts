import { isNullish, type UnknownRecord } from '@shared/types';

export function hasFields(
	record: UnknownRecord
): record is { fields: unknown[] } {
	if (isNullish(record)) {
		return false;
	}
	return 'fields' in record;
}
