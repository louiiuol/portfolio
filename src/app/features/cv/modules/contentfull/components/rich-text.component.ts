import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FormattedRichText } from '../types/rich-text.type';

@Component({
	selector: 'app-rich-text',
	host: {
		class: 'text-gray-800 text-sm max-w-prose text-balance leading-relaxed',
	},
	template: `
		@for (description of content(); track $index) {
			@switch (description.type) {
				@case ('text') {
					<p class="empty:hidden">
						{{ description.content }}
					</p>
				}
				@case ('list') {
					<ul class="text-xs italic empty:hidden">
						@for (item of description.content; track $index) {
							<li>{{ item }}</li>
						}
					</ul>
				}
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextComponent {
	readonly content = input.required<FormattedRichText>();
}
