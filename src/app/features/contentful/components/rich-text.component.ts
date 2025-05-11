import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FormattedRichText } from '../types/rich-text/rich-text.type';

@Component({
	selector: 'app-rich-text',
	host: {
		class: 'flex flex-col gap-2',
	},
	template: `
		@for (description of content(); track $index) {
			@switch (description.type) {
				@case ('text') {
					<p class="empty:hidden max-w-prose">
						{{ description.content }}
					</p>
				}
				@case ('list') {
					<ul class="italic empty:hidden list-disc pl-3">
						@for (item of description.content; track $index) {
							<li class="py-1 max-w-prose">{{ item }}</li>
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
