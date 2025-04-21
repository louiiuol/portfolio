import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { CvEvent } from '../types';
import { isJob } from '../types';

@Pipe({
	name: 'eventName',
})
export class EventNamePipe implements PipeTransform {
	transform = (value: CvEvent): string => {
		return isJob(value) ? value.title : value.name;
	};
}
