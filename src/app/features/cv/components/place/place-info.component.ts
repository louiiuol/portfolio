import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HouseLaptopIcon, LocationPinIcon } from '@shared/components';
import type { Place, RemotePolicy } from '../../types';

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

				<!-- Tag Infos -->
				<ul
					class="text-primary-400 flex gap-4 flex-wrap justify-start items-center text-xs font-medium">
					<!-- Address -->
					<li class="flex gap-2 items-center justify-start">
						<app-icon-location-pin />
						<span class=""> {{ place().city }} - {{ place().country }} </span>
					</li>

					<!-- Remote Policy -->
					@if (remotePolicy()) {
						<li class="flex gap-2 items-center justify-start">
							<app-icon-house-laptop />
							<span>
								{{ remotePolicy() }}
							</span>
						</li>
					}
				</ul>
			</div>
		</div>

		<!-- Description -->
		<p class="text-sm italic text-gray-600 max-w-prose">
			" {{ place().description }} "
		</p>
	`,
	imports: [LocationPinIcon, HouseLaptopIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceInfoComponent {
	readonly place = input.required<Place>();
	readonly remotePolicy = input<RemotePolicy>();
}
