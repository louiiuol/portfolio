import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

import { isJob, type ContractType, type CvEvent } from '../types';

const translations: Record<ContractType, string> = {
	alternance: 'Alternance',
	cdd: 'CDD',
	cdi: 'CDI',
	freelance: 'Freelance',
	stage: 'Stage',
};

@Pipe({
	name: 'eventType',
})
export class EventTypePipe implements PipeTransform {
	transform = (value: CvEvent): string =>
		isJob(value) ? translations[value.contractType] : 'Formation';
}
