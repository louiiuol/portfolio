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
		maxUnits?: number;
	}
): string {
	if (milliseconds < 0) {
		return '--';
	}

	const seconds = milliseconds * timeFactors['millisecond'].seconds;
	if (seconds <= 0) {
		return formatZeroDuration(opt);
	}

	return formatDurationParts(seconds, opt);
}

/**
 * Formats a duration of 0 seconds into a readable string.
 *
 * @param opt - Options for formatting.
 * @returns A string representing the zero duration.
 */
function formatZeroDuration(opt: { compact?: boolean }): string {
	return `0${opt.compact ? timeFactors.second.labelCompact : ' ' + timeFactors.second.label}`;
}

/**
 * Formats a duration in seconds into a readable string, stopping at the specified lowest unit.
 *
 * @param seconds - The total duration in seconds.
 * @param opt - Options for formatting.
 * @returns A string representing the formatted duration.
 */
function formatDurationParts(
	seconds: number,
	opt: {
		separator?: string;
		compact?: boolean;
		outputUnit?: TimeUnit;
		maxUnits?: number;
	}
): string {
	const { outputUnit, separator, compact, maxUnits } = opt;

	if (outputUnit) {
		const { seconds: unitSize, label, labelCompact } = timeFactors[outputUnit];
		const value = Math.floor(seconds / unitSize);
		const plural = value > 1 && label !== 'mois' ? 's' : '';

		return `${value}${compact ? '' : ' '}${compact ? labelCompact : label}${plural}`;
	}

	const parts: string[] = [];
	let remainingUnits = typeof maxUnits === 'number' ? maxUnits : Infinity;

	for (const unitKey of UNITS_IN_ORDER) {
		if (remainingUnits <= 0) break;

		const part = formatUnitPart(unitKey, seconds, opt);
		if (part) {
			parts.push(part.value);
			seconds = part.remainingSeconds;
			remainingUnits--;
		}
	}

	return parts.join(separator ?? ' ');
}

/**
 * Formats a specific unit part of the duration into a readable string.
 *
 * @param unitKey - The time unit to format.
 * @param seconds - The total duration in seconds.
 * @param opt - Options for formatting.
 * @returns An object containing the formatted value and remaining seconds, or null if the value is 0.
 */
function formatUnitPart(
	unitKey: TimeUnit,
	seconds: number,
	opt: { compact?: boolean }
): { value: string; remainingSeconds: number } | null {
	const { seconds: unitSize, label, labelCompact } = timeFactors[unitKey];
	const value = Math.floor(seconds / unitSize);

	if (value > 0) {
		const plural = value > 1 && label !== 'mois' ? 's' : '';
		return {
			value: `${value}${opt.compact ? '' : ' '}${opt.compact ? labelCompact : label}${plural}`,
			remainingSeconds: seconds % unitSize,
		};
	}

	return null;
}
