import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FormattedRichText } from '../types/rich-text.type';

@Component({
	selector: 'app-rich-text',
	host: {
		class: 'text-gray-800 text-sm leading-relaxed flex flex-col gap-2',
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
					<ul class="italic empty:hidden list-disc pl-3">
						@for (item of description.content; track $index) {
							<li class="py-1">{{ item }}</li>
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
