import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CapitalizePipe } from '@shared/pipes';

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
		'class':
			'absolute inset-0 flex flex-col gap-4 items-center justify-center rounded-lg z-20',
		'[class.bg-slate-100]': "theme() === 'light'",
		'[class.bg-slate-900]': "theme() === 'dark'",
	},
	template: `
		<span
			class="text-base italic text-center leading-loose my-6 inline-flex items-center gap-2"
			[class.text-primary-800]="theme() === 'light'"
			[class.text-slate-100]="theme() === 'dark'">
			{{ message() | capitalize }} <span class="text-xs">⏳</span>
		</span>

		<span
			class="rounded-full animate-spin size-12 border-transparent border-4 border-t-accent-300 border-b-accent-300 border-r-accent-300"></span>
	`,
	imports: [CapitalizePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
	message = input<string>('chargement du contenu');
	theme = input<'light' | 'dark'>('light');
}
