import type { TimeUnit } from '@shared/types';

/**
 * Factors for converting between time units.
 */
export const timeFactors: Record<
	TimeUnit,
	{ seconds: number; labelCompact: string; label: string }
> = {
	year: { seconds: 31_536_000, labelCompact: 'an', label: 'an' }, // Assuming 365-day year
	month: { seconds: 2_592_000, labelCompact: 'm', label: 'mois' }, // Assuming 30-day month
	week: { seconds: 604_800, labelCompact: 'sem', label: 'semaine' },
	day: { seconds: 86_400, labelCompact: 'j', label: 'jour' },
	hour: { seconds: 3600, labelCompact: 'h', label: 'heure' },
	minute: { seconds: 60, labelCompact: 'min', label: 'minute' },
	second: { seconds: 1, labelCompact: 's', label: 'seconde' },
	millisecond: { seconds: 0.001, labelCompact: 'ms', label: 'milliseconde' },
};

// Keep a consistent order from largest to smallest:
export const UNITS_IN_ORDER: TimeUnit[] = Object.keys(
	timeFactors
) as TimeUnit[];
