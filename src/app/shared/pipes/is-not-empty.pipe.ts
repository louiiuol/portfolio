import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { isEmpty } from '../functions/type-checker/is-not-empty-object.fn';

@Pipe({
	name: 'isNotEmpty',
})
export class IsNotEmptyPipe implements PipeTransform {
	transform(obj: object) {
		return !isEmpty(obj);
	}
}
