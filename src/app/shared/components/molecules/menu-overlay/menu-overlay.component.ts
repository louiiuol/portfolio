import { OverlayModule } from '@angular/cdk/overlay';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from '@angular/core';

export type MenuItem = {
	label: string;
	action?: () => void;
};

@Component({
	selector: 'app-menu',
	template: `
		<!-- @todo cdkPosition export as input -->
		<button
			class="appearance-none cursor-pointer"
			#trigger="cdkOverlayOrigin"
			cdkOverlayOrigin
			(click)="toggleDropdown()"
			(detach)="closeDropdown()">
			<ng-content select="[trigger]" />
		</button>
		<ng-template
			cdkConnectedOverlay
			cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
			[cdkConnectedOverlayHasBackdrop]="true"
			[cdkConnectedOverlayOpen]="isOpen()"
			[cdkConnectedOverlayOrigin]="trigger"
			[cdkConnectedOverlayPositions]="[
				{
					originX: 'end',
					originY: 'bottom',
					overlayX: 'end',
					overlayY: 'top',
				},
			]"
			(backdropClick)="closeDropdown()"
			(detach)="closeDropdown()">
			<div
				class="w-fit min-w-36 border border-slate-300 bg-white rounded-lg shadow my-1">
				<ul>
					@for (filter of menuItems(); track $index) {
						<li class="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800">
							@let action = filter.action;
							@if (action) {
								<button
									class="cursor-pointer"
									(click)="closeDropdown() && action()">
									{{ filter.label }}
								</button>
							} @else {
								{{ filter.label }}
							}
						</li>
					}
				</ul>
			</div>
		</ng-template>
	`,
	imports: [OverlayModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOverlay<T extends MenuItem> {
	readonly menuItems = input.required<T[]>();

	protected readonly isOpen = signal(false);

	protected toggleDropdown() {
		this.isOpen.set(!this.isOpen());
	}

	protected closeDropdown() {
		this.isOpen.set(false);
		return true;
	}
}
