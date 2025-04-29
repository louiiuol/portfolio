import { timeFactors, UNITS_IN_ORDER } from '@shared/constants';
import { isNullish, type TimeUnit } from '@shared/types';

type FormatOptions = {
	separator?: string;
	compact?: boolean;
	minOutput?: TimeUnit;
	maxOutput?: TimeUnit;
	maxUnits?: number;
};

export function formatDuration(
	milliseconds: number,
	opt?: FormatOptions
): string {
	if (
		isNullish(milliseconds) ||
		isNaN(milliseconds) ||
		typeof milliseconds !== 'number'
	) {
		return '--';
	}

	const seconds = milliseconds * timeFactors['millisecond'].seconds;

	if (seconds <= 0) {
		const unit = timeFactors[opt?.minOutput ?? 'second'];
		return `0${opt?.compact ? unit.labelCompact : ' ' + unit.label}`;
	}

	return formatDurationParts(seconds, opt);
}

/*───────────────────────────────────────*
 *              CORE LOGIC               *
 *───────────────────────────────────────*/
function formatDurationParts(seconds: number, opt?: FormatOptions): string {
	const { separator, compact, minOutput, maxOutput, maxUnits } = opt ?? {};
	const minIndex = UNITS_IN_ORDER.indexOf(minOutput ?? 'second');
	const maxIndex = UNITS_IN_ORDER.indexOf(maxOutput ?? 'year');
	const units = UNITS_IN_ORDER.slice(maxIndex, minIndex + 1);

	const minUnitInSeconds = timeFactors[minOutput ?? 'second'].seconds;

	if (seconds < minUnitInSeconds) {
		return formatSmallerThanMin(seconds, minIndex, compact);
	}

	if (maxUnits === 1) {
		return formatSingleUnit(seconds, units, compact, minOutput);
	}

	return formatMultiUnit(seconds, units, compact, separator, maxUnits);
}

/*───────────────────────────────────────*
 *         FORMATTING VARIANTS           *
 *───────────────────────────────────────*/

function formatSmallerThanMin(
	seconds: number,
	minIndex: number,
	compact?: boolean
): string {
	for (let i = minIndex + 1; i < UNITS_IN_ORDER.length; i++) {
		const unitKey = UNITS_IN_ORDER[i];
		const unit = timeFactors[unitKey];
		const value = seconds / unit.seconds;
		if (value >= 1) {
			return formatRawValue(value, unitKey, compact);
		}
	}

	const smallest = UNITS_IN_ORDER[UNITS_IN_ORDER.length - 1];
	return formatRawValue(
		seconds / timeFactors[smallest].seconds,
		smallest,
		compact
	);
}

function formatSingleUnit(
	seconds: number,
	units: TimeUnit[],
	compact?: boolean,
	minOutput?: TimeUnit
): string {
	if (minOutput) {
		return formatFixedUnit(seconds, minOutput, compact);
	}

	const unitKey = findLargestUnitWithValue(seconds, units);
	if (unitKey) {
		return formatFixedUnit(seconds, unitKey, compact);
	}

	const fallbackUnit = units[units.length - 1];
	const value = seconds / timeFactors[fallbackUnit].seconds;
	return formatRawValue(value, fallbackUnit, compact);
}

function formatFixedUnit(
	seconds: number,
	unitKey: TimeUnit,
	compact?: boolean
): string {
	const unit = timeFactors[unitKey];
	const value = Math.floor(seconds / unit.seconds);
	const plural =
		(!compact || unit.label === 'an') && value > 1 && unit.label !== 'mois'
			? 's'
			: '';
	return `${value}${compact ? '' : ' '}${compact ? unit.labelCompact : unit.label}${plural}`;
}

function findLargestUnitWithValue(
	seconds: number,
	units: TimeUnit[]
): TimeUnit | null {
	for (const unitKey of units) {
		const unit = timeFactors[unitKey];
		const value = Math.floor(seconds / unit.seconds);
		if (value >= 1) {
			return unitKey;
		}
	}
	return null;
}

function formatMultiUnit(
	seconds: number,
	units: TimeUnit[],
	compact?: boolean,
	separator = ' ',
	maxUnits = Infinity
): string {
	const parts: string[] = [];

	for (const unitKey of units) {
		if (maxUnits <= 0) {
			break;
		}

		const part = formatUnitPart(unitKey, seconds, compact);
		if (part) {
			parts.push(part.value);
			seconds = part.remainingSeconds;
			maxUnits--;
		}
	}

	return parts.join(separator);
}

/*───────────────────────────────────────*
 *          LOW-LEVEL HELPERS            *
 *───────────────────────────────────────*/

function formatUnitPart(
	unitKey: TimeUnit,
	seconds: number,
	compact?: boolean
): { value: string; remainingSeconds: number } | null {
	const { seconds: unitSize, label, labelCompact } = timeFactors[unitKey];
	const value = Math.floor(seconds / unitSize);

	if (value > 0) {
		const plural = !compact && value > 1 && label !== 'mois' ? 's' : '';
		return {
			value: `${value}${compact ? '' : ' '}${compact ? labelCompact : label}${plural}`,
			remainingSeconds: seconds % unitSize,
		};
	}

	return null;
}

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
