import { timeFactors, UNITS_IN_ORDER } from '@shared/constants';
import { isNullish, type TimeUnit } from '@shared/types';

/**
 * Formats a duration in milliseconds into a readable string.
 * Allows controlling formatting using min/max units, compact labels, separators, and maxUnits.
 */
export function formatDuration(
	milliseconds: number,
	opt?: {
		separator?: string;
		compact?: boolean;
		minOutput?: TimeUnit;
		maxOutput?: TimeUnit;
		maxUnits?: number;
	}
): string {
	if (isNullish(milliseconds) || isNaN(milliseconds)) {
		return '--';
	}

	const seconds = milliseconds * timeFactors['millisecond'].seconds;

	if (seconds <= 0) {
		const unit = timeFactors[opt?.minOutput ?? 'second'];
		return `0${opt?.compact ? unit.labelCompact : ' ' + unit.label}`;
	}

	return formatDurationParts(seconds, opt);
}

function formatDurationParts(
	seconds: number,
	opt?: {
		separator?: string;
		compact?: boolean;
		minOutput?: TimeUnit;
		maxOutput?: TimeUnit;
		maxUnits?: number;
	}
): string {
	const { separator, compact, minOutput, maxOutput, maxUnits } = opt ?? {};

	const minIndex = UNITS_IN_ORDER.indexOf(minOutput ?? 'second');
	const maxIndex = UNITS_IN_ORDER.indexOf(maxOutput ?? 'year');
	const units = UNITS_IN_ORDER.slice(maxIndex, minIndex + 1); // from largest to smallest unit

	const minUnitInSeconds = timeFactors[minOutput ?? 'second'].seconds;

	// 🔹 If duration is smaller than minOutput, display in the best smaller unit available
	if (seconds < minUnitInSeconds) {
		for (let i = minIndex + 1; i < UNITS_IN_ORDER.length; i++) {
			const unitKey = UNITS_IN_ORDER[i];
			const unit = timeFactors[unitKey];
			const value = seconds / unit.seconds;

			if (value >= 1) {
				return formatRawValue(value, unitKey, compact);
			}
		}

		// Fallback: use the smallest known unit
		const lastUnit = UNITS_IN_ORDER[UNITS_IN_ORDER.length - 1];
		return formatRawValue(
			seconds / timeFactors[lastUnit].seconds,
			lastUnit,
			compact
		);
	}

	// 🔹 Special case: if maxUnits === 1
	if (maxUnits === 1) {
		if (minOutput) {
			// Force display in minOutput
			const unit = timeFactors[minOutput];
			const value = Math.floor(seconds / unit.seconds);
			const plural =
				(!compact || unit.label === 'an') && value > 1 && unit.label !== 'mois'
					? 's'
					: '';
			return `${value}${compact ? '' : ' '}${compact ? unit.labelCompact : unit.label}${plural}`;
		}
		// Choose the best highest unit available
		for (const unitKey of units) {
			const unit = timeFactors[unitKey];
			const value = Math.floor(seconds / unit.seconds);
			if (value >= 1) {
				const plural =
					!compact && value > 1 && unit.label !== 'mois' ? 's' : '';
				return `${value}${compact ? '' : ' '}${compact ? unit.labelCompact : unit.label}${plural}`;
			}
		}
		// Fallback: show in the smallest unit
		const smallest = units[units.length - 1];
		return formatRawValue(
			seconds / timeFactors[smallest].seconds,
			smallest,
			compact
		);
	}

	// 🔹 Standard case: build parts from maxOutput to minOutput
	const parts: string[] = [];
	let remainingUnits = typeof maxUnits === 'number' ? maxUnits : Infinity;

	for (const unitKey of units) {
		if (remainingUnits <= 0) {
			break;
		}

		const part = formatUnitPart(unitKey, seconds, { compact });
		if (part) {
			parts.push(part.value);
			seconds = part.remainingSeconds;
			remainingUnits--;
		}
	}

	return parts.join(separator ?? ' ');
}

/**
 * Formats a unit part of the total duration.
 * Returns the formatted string and remaining seconds.
 */
function formatUnitPart(
	unitKey: TimeUnit,
	seconds: number,
	opt?: { compact?: boolean }
): { value: string; remainingSeconds: number } | null {
	const { seconds: unitSize, label, labelCompact } = timeFactors[unitKey];
	const value = Math.floor(seconds / unitSize);

	if (value > 0) {
		const plural = !opt?.compact && value > 1 && label !== 'mois' ? 's' : '';
		return {
			value: `${value}${opt?.compact ? '' : ' '}${opt?.compact ? labelCompact : label}${plural}`,
			remainingSeconds: seconds % unitSize,
		};
	}

	return null;
}

/**
 * Formats a raw value into a unit string with up to two decimal places.
 */
function formatRawValue(
	value: number,
	unitKey: TimeUnit,
	compact?: boolean
): string {
	const { label, labelCompact } = timeFactors[unitKey];
	const rounded = Math.round(value * 100) / 100;
	const plural = !compact && rounded > 1 && label !== 'mois' ? 's' : '';
	return `${rounded}${compact ? '' : ' '}${compact ? labelCompact : label}${plural}`;
}
