import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
	selector: 'lou-scroll-indicators',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './scroll-indicators.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollIndicatorsComponent {
	@HostBinding('class') class =
		'block surface-ground w-full h-3rem md:h-full md:w-3rem';
}
