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
		<button
			class="appearance-none"
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
			(backdropClick)="closeDropdown()"
			(detach)="closeDropdown()">
			<div
				class="w-fit min-w-36 border border-gray-300 bg-white rounded-lg shadow my-1">
				<ul>
					@for (filter of menuItems(); track $index) {
						<li class="px-4 py-2 bg-gray-100 hover:bg-gray-200  text-gray-800">
							@let action = filter.action;
							@if (action) {
								<button (click)="closeDropdown() && action()">
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
