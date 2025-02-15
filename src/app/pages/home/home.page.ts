import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconLogoComponent } from '../../shared/components/atoms/icon/icon-logo.component';
import { TypistComponent } from '../../shared/components/molecules/typist.component';

@Component({
	selector: 'app-home-page',
  host: { class: 'page items-center justify-center bg-linear-to-t from-primary-300 to-primary-700'},
	template: `
    <app-icon-logo class="w-full max-w-[80%] md:max-w-3xl" variant="expanded" />
    <app-typist
      class="text-3xl md:text-4xl lg:text-5xl"
      [toType]="['Hello World!', 'This is a typing effect.']" />
  `,
  imports: [IconLogoComponent, TypistComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
	title = 'portfolio';
}
