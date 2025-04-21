import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { CvEvent } from '../types';
import { isJob } from '../types';

@Pipe({
	name: 'eventDescription',
})
export class EventDescriptionPipe implements PipeTransform {
	transform(value: CvEvent): string {
		return isJob(value) ? value.summary : value.description;
	}
}
