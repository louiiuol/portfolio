import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Simple component to display an icon from material-symbols-outlined font.
 * Refer to the material-symbols-outlined font for the list of available icons.
 * https://fonts.google.com/icons
 *
 * @example
 * ```html
 * <app-icon name="favorite" />
 * <app-icon name="favorite" size="3.5rem" />
 * ```
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-icon-material',
	standalone: true,
	host: {
		'class': 'material-symbols-outlined inline-block',
		'[style.width]': 'size()',
		'[style.height]': 'size()',
		'[style.fontSize]': 'size()',
	},
	template: ` {{ name() }} `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconMaterialComponent {
	/**
	 * Name of the material icon (check google material icon website for the list of available icons)
	 */
	name = input.required<string>();

	/**
	 * Size of the icon (must include css unit)
	 */
	size = input<string>('1.5rem');
}
