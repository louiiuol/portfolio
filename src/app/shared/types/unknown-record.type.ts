export type UnknownRecord = Record<string, unknown>;

export function isUnknownRecord(obj: unknown): obj is UnknownRecord {
	return typeof obj === 'object' && obj !== null;
}
