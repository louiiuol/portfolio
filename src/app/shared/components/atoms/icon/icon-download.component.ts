import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-icon-download',
	template: `⬇`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadIcon {}
