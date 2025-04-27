import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { nullish } from '@shared/types';

@Pipe({
	name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
	transform(value?: string | nullish) {
		if (!value) {
			return '--';
		}

		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
