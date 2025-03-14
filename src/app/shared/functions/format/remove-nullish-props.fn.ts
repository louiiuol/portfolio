import type { NonNullish } from '@shared/types/nullish.type';

/**
 * Recursively strips out null/undefined props from any object or array
 */
export function removeNullishProps<T>(obj: T): NonNullish<T> {
	// 1. If nullish or not an object, just return it as-is
	if (obj === null || obj === undefined || typeof obj !== 'object') {
		return obj as NonNullish<T>;
	}

	// 2. If it's an array, filter out nullish items and recurse
	if (Array.isArray(obj)) {
		// Extract element type
		type Element = T extends (infer U)[] ? U : never;

		// Filter out null/undefined items
		const filtered = (obj as Element[]).filter(
			(item): item is NonNullable<Element> =>
				item != null && item !== undefined && item !== ''
		);

		// Recursively remove nullish from each item
		const mapped = filtered.map(removeNullishProps) as NonNullish<Element>[];

		// Cast the array result to NonNullish<T>
		return mapped as NonNullish<T>;
	}

	// 3. Otherwise, it's a plain object: remove nullish props, recurse on each

	// (A) Filter to keep only non-nullish entries
	const filteredEntries = Object.entries(obj).filter(
		([, val]) =>
			val != null &&
			val !== undefined &&
			val !== '' &&
			(Array.isArray(val) ? val.length > 0 : true)
	) as [string, unknown][];

	// (B) Recursively remove nullish from each value
	//     We provide a tuple type here so TS doesn’t default to any[]
	const cleaned = filteredEntries.map<[string, unknown]>(([key, val]) => {
		return [key, removeNullishProps(val)];
	});

	// (C) Build an object from the cleaned entries
	return Object.fromEntries(cleaned) as NonNullish<T>;
}
