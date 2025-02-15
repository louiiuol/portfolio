import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconLogoComponent } from '../../shared/components/atoms/icon/icon-logo.component';

@Component({
	selector: 'app-home-page',
  host: { class: 'page items-center justify-center bg-linear-to-t from-primary-300 to-primary-700'},
	template: `
    <app-icon-logo class="w-full max-w-[70%]" variant="expanded" />
  `,
  imports: [IconLogoComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
	title = 'portfolio';
}
