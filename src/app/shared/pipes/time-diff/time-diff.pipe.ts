import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { formatDuration } from '@shared/functions';
import type { nullish, TimeUnit } from '@shared/types';

/**
 * Pipe to calculate the difference between two dates.
 * @param dates - Object containing startDate and endDate (optional).
 * @param outputUnit - The unit of time to output the difference in.
 * @param compact - Whether to return a compact string or not.
 * @returns A string representing the time difference.
 */
@Pipe({
	name: 'timeDiff',
})
export class TimeDifferencePipe implements PipeTransform {
	transform = (
		dates: { startDate: Date; endDate?: Date | nullish },
		outputUnit?: TimeUnit,
		maxUnits?: number,
		compact: boolean = false
	): string => {
		if (!dates?.startDate) {
			return '--';
		}

		const endTimestamp = (
			dates.endDate ? new Date(dates.endDate) : new Date()
		).getTime();
		const startTimestamp = new Date(dates.startDate).getTime();

		// Check for invalid dates
		if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
			return '--';
		}

		const prefix = endTimestamp < startTimestamp ? '-' : '';
		return (
			prefix +
			formatDuration(Math.abs(startTimestamp - endTimestamp), {
				outputUnit,
				maxUnits,
				compact,
			})
		);
	};
}
