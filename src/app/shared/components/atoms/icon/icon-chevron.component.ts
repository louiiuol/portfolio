import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';
import type { IconSize } from './icon-size.type';

@Component({
	selector: 'app-icon-chevron',
	host: {
		'class': 'app-icon transform',
		'[class]': 'size()',
	},
	template: ` <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
		<path
			class="stroke-current origin-center"
			d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
			[style.transform]="rotation()" />
	</svg>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChevronIcon {
	size = input<IconSize>('size-4');

	/**
	 * The direction of the chevron icon (where it points).
	 */
	direction = input<'up' | 'down' | 'left' | 'right'>('left');

	protected rotation = computed(() => {
		switch (this.direction()) {
			case 'up':
				return 'rotate(-90deg)';
			case 'down':
				return 'rotate(90deg)';
			case 'left':
				return 'rotate(0)';
			case 'right':
				return 'rotate(180deg)';
		}
	});
}
