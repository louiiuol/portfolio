import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
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
	@HostBinding('class') class = 'block h-full';
	socialLinks = [
		{network: 'Twitter', link: '#'},
		{network: 'LinkedIn', link: '#'},
		{network: 'Github', link: '#'},
		{network: 'Discord', link: '#'},
		{network: 'Twitter', link: '#'},
		{network: 'LinkedIn', link: '#'},
		{network: 'Github', link: '#'},
		{network: 'Discord', link: '#'},
	];
	qas = [
		{
			question: 'Why am I doing this ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Another question, a bit longer this time ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Why am I doing this ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Another question, a bit longer this time ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Why am I doing this ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Another question, a bit longer this time ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Why am I doing this ?',
			answer: 'I love to design new interfaces ...',
		},
		{
			question: 'Another question, a bit longer this time ?',
			answer: 'I love to design new interfaces ...',
		},
	];
}
