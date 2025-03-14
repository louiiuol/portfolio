import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-error-message',
	host: {
		class:
			'flex flex-col items-center p-2 gap-4 flex-1 w-full mt-3 text-lg text-pretty font-medium italic text-slate-600',
	},
	template: ` {{ errorMessage() }} `,
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
	readonly errorMessage = input(
		'Une erreur est survenue, merci de réessayer plus tard 🙏'
	);
}
