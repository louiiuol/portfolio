import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {
	Component,
	OnChanges,
	Input,
	ViewEncapsulation,
	OnDestroy,
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

/**
 * Component to display a loading icon.
 */
@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'lou-icon',
	template: `<!-- SVG embedded Icon -->
		<span *ngIf="svgIconTag" [innerHTML]="svgIconTag"></span>`,
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements OnChanges, OnDestroy {

  /** Defines icon to be shown. Check assets/img/svg/ folder for available icons */
  @Input() name?: string;

	svgIconTag?: SafeHtml;
	obs?: Subscription;

	constructor(
		private _httpClient: HttpClient,
		private _sanitizer: DomSanitizer
	) {}

	ngOnDestroy(): void {
		this.obs?.unsubscribe();
	}

	ngOnChanges(): void {
		if (!this.name) return;
		this.obs = this._httpClient
			.get(`assets/images/svg/${this.name}.svg`, {responseType: 'text'})
			.subscribe(
				value =>
					(this.svgIconTag = this._sanitizer.bypassSecurityTrustHtml(value))
			);
	}
}
