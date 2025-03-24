import { timeFactors, UNITS_IN_ORDER } from '@shared/constants';
import type { TimeUnit } from '@shared/types';

/**
 * Formats a duration in seconds into a readable string, optionally stopping
 * at a specified lowest unit.
 *
 * @param milliseconds - The total duration in milliseconds (can be fractional).
 * @param separator - The string used to separate each time part in the output.
 * @param compact - If true, uses short labels instead of long labels.
 * @param outputUnit - If provided, once this unit is reached it becomes the smallest displayed (and smaller units are discarded).
 */
export function formatDuration(
	milliseconds: number,
	opt: {
		separator?: string;
		compact?: boolean;
		outputUnit?: TimeUnit;
	}
): string {
	if (!milliseconds || milliseconds < 1) {
		return '--';
	}
	let seconds = milliseconds * timeFactors['millisecond'].seconds;
	// If someone passes negative values or 0, handle gracefully:
	if (seconds <= 0) {
		return `0 ${opt.compact ? timeFactors.second.labelCompact : timeFactors.second.label}`;
	}

	let reachedLowest = false;
	const parts: string[] = [];

	for (const unitKey of UNITS_IN_ORDER) {
		// If we've already reached the requested lowest unit, ignore smaller units
		if (reachedLowest) {
			break;
		}

		const { seconds: unitSize, label, labelCompact } = timeFactors[unitKey];
		// How many of this unit fit into the current remainder?
		const value = Math.floor(seconds / unitSize);

		if (value > 0) {
			const plural = value > 1 && label !== 'mois' ? 's' : '';
			parts.push(`${value} ${opt.compact ? labelCompact : label}${plural}`);
			// Reduce remainder
			seconds = seconds % unitSize;
		}

		// If this is the lowest unit we want to show, stop after adding it
		if (opt.outputUnit === unitKey) {
			reachedLowest = true;
		}
	}

	return parts.join(opt.separator ?? ' ');
}
