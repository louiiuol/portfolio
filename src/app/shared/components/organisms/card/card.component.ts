import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ButtonComponent, CloseIcon } from '../../atoms';

@Component({
	selector: 'app-card',
	host: {
		class:
			'pt-3 px-3 sm:px-6 flex flex-col gap-2 bg-slate-50 rounded-lg shadow-md w-full h-full',
	},
	template: `
		<div class="flex flex-col gap-4">
			<header class="flex justify-between items-start gap-3">
				<div class="font-semibold text-2xl flex-1 text-primary-900">
					<ng-content select="[heading]" />
				</div>
				@if (closable()) {
					<button
						class="ml-auto"
						app-button
						appearance="icon"
						(click)="closed.emit()">
						<app-icon-close />
					</button>
				}
			</header>
			<ng-content select="[subHeader]" />
		</div>

		<section
			class="flex flex-col gap-6 overflow-y-auto px-3 -mx-3 py-3 sm:-mx-6 sm:px-4 bg-slate-50 rounded-lg relative flex-1 stable-scrollbar-gutter inset-app-shadow">
			<ng-content />
		</section>

		<footer
			class="flex justify-between items-center gap-4 empty:hidden mt-auto w-full pb-3">
			<ng-content select="[footer]" />
		</footer>
	`,
	imports: [CloseIcon, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
	readonly closable = input(false, { transform: booleanAttribute });

	readonly closed = output<void>();
}
