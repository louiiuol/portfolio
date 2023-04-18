import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconComponent} from '@layout/atoms';

import qas from '@assets/json/q&as.json';
import contactLinks from '@assets/json/contacts.json';

/**
 * Presentation of myself and contact information
 * @author louiiuol
 * @version 1.0.0
 */
@Component({
	selector: 'lou-summary',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
	@HostBinding('class') class = 'block h-full';
	readonly contactLinks = contactLinks;
	readonly qas = qas;
	readonly tasks = [
		'Understand your needs and creating CDC',
		'Design database schema',
		'Develop a Restful API to manipulate database',
		'Design wireframes and website UX',
		'Develop web interface',
	];
}
