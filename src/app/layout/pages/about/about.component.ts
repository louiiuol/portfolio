import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {TabViewModule} from 'primeng/tabview';

/**
 * Presentation of myself, my skills and experiences
 * @author louiiuol
 * @version 0.0.1
 */
@Component({
	standalone: true,
	imports: [TabViewModule],
	selector: 'lou-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AboutComponent {
	@HostBinding('class') class = 'flex-1 md:h-full';
}
