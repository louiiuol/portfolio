import {CommonModule} from '@angular/common';
import {Component, HostBinding, Input} from '@angular/core';
import {IconComponent} from './icon/icon.component';

type LoadingIconSize = 'expanded' | 'small';

@Component({
	standalone: true,
	imports: [CommonModule, IconComponent],
	selector: 'lou-loader',
	template: `<lou-icon
		style="max-width: 70%"
		[name]="'logo-' + loadingIconSize"></lou-icon>`,
})
export class LoaderComponent {
	@HostBinding('class') class =
		'h-full w-full flex align-items-center justify-content-center p-3 surface-overlay';

	/** Specify which version  of the loader's icon should appear   */
	@Input() loadingIconSize: LoadingIconSize = 'expanded';
}
