import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { isEmpty } from '@shared/functions/type-checker';

@Pipe({
	name: 'isNotEmpty',
})
export class IsNotEmptyPipe implements PipeTransform {
	transform = (obj: object) => !isEmpty(obj);
}
