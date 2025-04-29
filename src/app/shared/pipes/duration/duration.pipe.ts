import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { formatDuration } from '@shared/functions';
import type { nullish, TimeUnit } from '@shared/types';

/**
 * Convert duration from one unit to another or generate a human-readable duration breakdown.
 * @param time The duration to convert.
 * @param inputUnit The unit of the duration to convert. Default is 'second'.
 * @param outputUnit The unit to convert the duration to. Default is 'hour'.
 * @returns The converted duration as a string.
 *
 * @see `timeFactors` for the conversion factors.
 * @see `TimeUnit` for the available time units.
 *
 * @author louiiuol
 */
@Pipe({
	name: 'duration',
	standalone: true,
})
export class DurationPipe implements PipeTransform {
	transform(
		ms: number | nullish,
		opt?: {
			minOutput?: TimeUnit;
			compact?: boolean;
			separator?: string;
		}
	): string {
		if (!ms) {
			return '--';
		}
		return formatDuration(ms, opt);
	}
}
