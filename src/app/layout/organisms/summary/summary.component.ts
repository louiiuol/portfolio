import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconComponent} from '@layout/atoms';

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
	socialLinks = [
		{network: 'Twitter', link: '#'},
		{network: 'LinkedIn', link: '#'},
		{network: 'Github', link: '#'},
		{network: 'Discord', link: '#'},
	];
}
