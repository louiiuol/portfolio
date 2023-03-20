import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {
	Component,
	OnChanges,
	Input,
	ViewEncapsulation,
	ChangeDetectionStrategy,
} from '@angular/core';
import {Observable} from 'rxjs';

import {TrustHtmlPipe} from '@core';

/**
 * Embedded SVG icon fetched locally from custom assets.
 * Check property "name" for technical information.
 * @author louiiuol
 * @version 0.1.1
 */
@Component({
	standalone: true,
	imports: [CommonModule, TrustHtmlPipe],
	selector: 'lou-icon',
	template: ` <!-- SVG embed tag -->
		<span *ngIf="name" [innerHTML]="svgIconTag$ | async | trustHtml"></span>`,
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
	/**
	 * Defines icon to be shown. (can be updated)
	 * * Check assets/images/svg folder for available icons
	 */
	@Input() name?: string;

	svgIconTag$?: Observable<string | undefined>;

	private readonly _ASSETS_ROOT = 'assets/images/svg';

	constructor(private _httpClient: HttpClient) {}

	ngOnChanges(): void {
		if (this.name)
			this.svgIconTag$ = this._httpClient.get(
				`${this._ASSETS_ROOT}/${this.name}.svg`,
				{
					responseType: 'text',
				}
			);
	}
}
