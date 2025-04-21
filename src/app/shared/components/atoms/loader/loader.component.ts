import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';

/**
 * Simple component to render a loader (with CSS only).
 * This component is meant to be called within @if control flow: otherwise will always be shown.
 * Also, this component is positioned as absolute, so parent element must be positioned as relative.
 *
 * @author louiiuol
 */
@Component({
	selector: 'app-loader',
	host: {
		class:
			'absolute inset-0 bg-slate-100 flex flex-col gap-4 items-center justify-center rounded-lg z-20',
	},
	template: ` <span
			class="text-primary-900 text-base italic text-center leading-loose my-6 inline-flex items-center gap-2">
			{{ message() | capitalize }} <span class="text-xs">⏳</span>
		</span>
		<span
			class="rounded-full text-primary animate-spin size-12 border-transparent border-4 border-t-accent-300 border-b-accent-300 border-r-accent-300"></span>`,
	imports: [CapitalizePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
	message = input<string>('chargement du contenu');
}
