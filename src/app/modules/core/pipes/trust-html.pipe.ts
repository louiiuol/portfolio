import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
	standalone: true,
	name: 'trustHtml',
})
export class TrustHtmlPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}
	transform(value?: string | null): SafeHtml {
		return this._sanitizer.bypassSecurityTrustHtml(value ?? '');
	}
}
