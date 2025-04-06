import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	input,
} from '@angular/core';

/**
 * Appearance of the button.
 * * `basic` -  No background color, Selector color is applied to text color. Ripple effect on hover.
 * * `flat` - Default button appearance. Selector color is applied to background. Ripple effect on hover.
 * * `stroked` - Button with border. Selector color is applied to border color. Ripple effect on hover.
 * * `icon` - Button with icon only. Spacing are squared. Ripple effect on hover.
 * * `icon-stroked` - Button with icon only and border. Spacing are squared. Ripple effect on hover.
 * * `fab` - Floating action button. Circular button with icon only. Ripple effect on hover.
 */
export type ButtonAppearance =
	| 'basic'
	| 'flat'
	| 'stroked'
	| 'icon'
	| 'icon-stroked'
	| 'fab';

/**
 * Button component with different colors, appearances, and sizes.
 * Also supports disabled property to prevent click events.
 * **Important: This component must be called by adding `app-button` attribute on <button> or <a> element.**
 *
 * @example
 * ```html
 * <button app-button>Default</button>
 * <button app-button appearance="stroked">stroked</button>
 * <button app-button rounded>Rounded</button>
 * <button app-button disabled>Disabled</button>
 * ```
 * @author louiiuol
 */
@Component({
	selector: 'button[app-button], a[app-button]',
	standalone: true,
	host: {
		'class': 'inline-flex justify-center items-center gap-2 cursor-pointer',
		'[attr.data-color]': 'color()',
		'[attr.data-size]': 'size()',
		'[attr.data-rounded]': 'rounded()',
		'[attr.data-disabled]': 'disabled()',
		'[attr.data-appearance]': 'appearance()',
		'[class.w-full]': 'full()',
		'[class.w-fit]': '!full()',
		'[attr.type]': 'type()',
	},
	template: ` <ng-content /> `,
	styleUrl: './button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	/**
	 * Color of the button.
	 */
	readonly color = input<'primary' | 'accent' | 'red' | 'white'>('primary');

	/**
	 * Size of the button. Changes the font size and the padding applied.
	 * @default 'medium'
	 */
	readonly size = input<'extra-small' | 'small' | 'medium' | 'large'>('medium');

	/**
	 * Whether the button should take the full width or not.
	 * @default false
	 */
	readonly full = input(false, { transform: booleanAttribute });

	/**
	 * Whether the button should have rounded shape or not.
	 * @default true
	 */
	readonly rounded = input(true, { transform: booleanAttribute });

	/**
	 * Whether the button should be disabled; Prevents triggering the click event.
	 * @default false
	 */
	readonly disabled = input(false, { transform: booleanAttribute });

	/**
	 * Appearance of the button.
	 * @see ButtonAppearance
	 * @default 'flat'
	 */
	readonly appearance = input<ButtonAppearance>('flat');

	/**
	 * Type of the button. Allows to overrides default button behavior to submit or reset form.
	 * @default 'button'
	 */
	readonly type = input<'button' | 'submit' | 'reset'>('button');
}
