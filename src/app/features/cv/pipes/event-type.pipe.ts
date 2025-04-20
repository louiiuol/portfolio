import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { isJob, type CvEvent } from '../types';

@Pipe({
	name: 'eventType',
})
export class EventTypePipe implements PipeTransform {
	transform(value: CvEvent): string {
		return isJob(value) ? value.contractType : 'Formation';
	}
}
