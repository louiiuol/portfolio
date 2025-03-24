import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { formatDuration } from '../functions';
import type { nullish } from '../types';

@Pipe({
	name: 'timeDiff',
})
export class TimeDifferencePipe implements PipeTransform {
	transform(dates: { startDate: Date; endDate?: Date | nullish }): string {
		return formatDuration(
			new Date(dates.endDate ?? 0).getTime() -
				new Date(dates.startDate).getTime(),
			{ outputUnit: 'month' }
		);
	}
}
