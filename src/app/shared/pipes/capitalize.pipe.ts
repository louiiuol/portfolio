import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
	name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
	transform(value: string) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
