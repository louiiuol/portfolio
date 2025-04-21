import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

import { isJob, type CvEvent, type Place } from '../types';

@Pipe({
	name: 'eventLocation',
})
export class EventLocationPipe implements PipeTransform {
	transform = (value: CvEvent): Place =>
		isJob(value) ? value.company : value.school;
}
