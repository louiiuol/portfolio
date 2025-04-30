import type { ElementRef } from '@angular/core';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { isNotNullish } from '@shared/types';
import { combineLatest, filter, map } from 'rxjs';
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
				<div class="font-semibold text-2xl flex-1 text-primary-800">
					<ng-content select="[heading]" />
				</div>
				@if (closable()) {
					<button
						class="ml-auto"
						app-button
						appearance="icon-stroked"
						aria-label="Fermer la vue"
						(click)="closed.emit()">
						<app-icon-close />
					</button>
				}
			</header>
			<ng-content select="[subHeader]" />
		</div>

		<section
			class="flex flex-col gap-6 overflow-y-auto px-3 -mx-3 py-3 sm:-mx-6 sm:px-4 bg-slate-50 rounded-lg relative flex-1 stable-scrollbar-gutter inset-app-shadow"
			#scrollContainer>
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

	private readonly router = inject(Router);

	private readonly scrollContainer =
		viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

	private readonly scrollElement$ = toObservable(this.scrollContainer).pipe(
		map(el => el?.nativeElement),
		filter(isNotNullish)
	);

	constructor() {
		combineLatest([this.router.events, this.scrollElement$])
			.pipe(
				filter(([event]) => event instanceof NavigationEnd),
				map(res => res[1]),
				takeUntilDestroyed()
			)
			.subscribe(element => (element.scrollTop = 0));
	}
}
