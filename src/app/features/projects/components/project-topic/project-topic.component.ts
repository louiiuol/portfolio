import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-project-topic-pill',
	host: {
		class:
			'text-primary-400 border border-primary-400 px-1 py-0.5 text-xs rounded-lg  w-fit',
	},
	template: ` <span class="min-w-fit whitespace-nowrap">
		{{ topic() }}
	</span>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTopicPillComponent {
	topic = input.required<string>();
}
