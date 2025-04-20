import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LocationPinIcon } from '@shared/components';
import type { Place } from '../types';

@Component({
	selector: 'app-place-info',
	host: { class: 'flex flex-col gap-2' },
	template: `
		<div class="flex gap-4 items-start justify-start">
			<!-- Logo -->
			<img
				class="size-14"
				[alt]="'Logo de ' + place().name"
				[src]="place().logo.file.url" />

			<!-- Name and url -->
			<div class="flex flex-col gap-1">
				<h4 class="text-md font-semibold text-primary-500">
					{{ place().name }}
					@if (place().url) {
						<span class="text-xs"
							>(<a class="text-blue-500" target="_blank" [href]="place().url">
								Voir le site </a
							>)</span
						>
					}
				</h4>

				<!-- Address -->
				<ul
					class="text-primary-400 flex gap-4 flex-wrap justify-start items-center">
					<li class="flex gap-2 items-center justify-start">
						<app-icon-location-pin />
						<span class="text-xs font-semibold text-primary-400">
							{{ place().city }} - {{ place().country }}
						</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Description -->
		<p class="text-sm italic text-gray-600 max-w-prose">
			" {{ place().description }} "
		</p>
	`,
	imports: [LocationPinIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceInfoComponent {
	readonly place = input.required<Place>();
}
