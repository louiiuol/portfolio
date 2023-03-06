import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, OnChanges, Input, ViewEncapsulation} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TrustHtmlPipe} from 'src/app/modules/core/pipes/trust-html.pipe';

/**
 * Component embedding a SVG icon
 */
@Component({
	standalone: true,
	imports: [CommonModule, TrustHtmlPipe],
	selector: 'lou-icon',
	template: `<!-- SVG embedded Icon -->
		<span
			*ngIf="svgIconTag"
			[innerHTML]="svgIconTag | async | trustHtml"></span>`,
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnChanges {
	/** Defines icon to be shown. Check assets/img/svg/ folder for available icons */
	@Input() name?: string;

	svgIconTag: Observable<string> = of('');

	constructor(private _httpClient: HttpClient) {}

	ngOnChanges(): void {
		if (!this.name) return;
		this.svgIconTag = this._httpClient.get(
			`assets/images/svg/${this.name}.svg`,
			{
				responseType: 'text',
			}
		);
	}
}
