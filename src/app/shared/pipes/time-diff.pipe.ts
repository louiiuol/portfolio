import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { formatDuration } from '../functions';
import type { nullish } from '../types';

@Pipe({
	name: 'timeDiff',
})
export class TimeDifferencePipe implements PipeTransform {
	transform(dates: { startDate: Date; endDate?: Date | nullish }): string {
		console.log(new Date(dates.endDate ?? 0));
		return formatDuration(
			(dates.endDate ? new Date(dates.endDate) : new Date()).getTime() -
				new Date(dates.startDate).getTime(),
			{ outputUnit: 'month' }
		);
	}
}
