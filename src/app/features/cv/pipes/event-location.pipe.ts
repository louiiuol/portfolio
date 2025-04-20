import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { isJob, type CvEvent } from '../types';

@Pipe({
	name: 'eventLocation',
})
export class EventLocationPipe implements PipeTransform {
	transform(value: CvEvent) {
		return isJob(value) ? value.company : value.school;
	}
}
