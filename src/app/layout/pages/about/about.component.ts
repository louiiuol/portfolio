import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {TabViewModule} from 'primeng/tabview';
import {SummaryComponent} from '@layout/organisms';

/**
 * Presentation tabs of myself, my skills and experiences
 * @author louiiuol
 * @version 0.0.1
 */
@Component({
	standalone: true,
	imports: [TabViewModule, SummaryComponent],
	selector: 'lou-about',
	template: `<p-tabView
		styleClass="h-full border-round overflow-hidden shadow-4">
		<p-tabPanel
			header="Introduction"
			leftIcon="pi pi-user"
			tooltip="Who am I ?"
			tooltipPosition="bottom">
			<lou-summary></lou-summary>
		</p-tabPanel>
		<p-tabPanel
			header="Skills"
			leftIcon="pi pi-chart-bar"
			tooltip="What can I do ?"
			tooltipPosition="bottom">
			<p>Sed ut perspiciatis unde omnis</p>
		</p-tabPanel>
		<p-tabPanel
			header="Experiences"
			leftIcon="pi pi-briefcase"
			tooltip="How I got there ?"
			tooltipPosition="bottom">
			<p>At vero eos et accusamuss.</p>
		</p-tabPanel>
	</p-tabView> `,
	styleUrls: ['./about.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AboutComponent {
	@HostBinding('class') class = '';
}
