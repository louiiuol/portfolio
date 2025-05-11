import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PlaceEntry, RemotePolicy } from '@feat/contentful/types';
import {
	ExternalLinkIcon,
	HouseLaptopIcon,
	LocationPinIcon,
} from '@shared/components';

@Component({
	selector: 'app-place-info',
	host: { class: 'flex flex-col gap-4' },
	template: `
		<div class="flex gap-4 items-start justify-start">
			<!-- Logo -->
			@if (place().logo.file.url; as logoUrl) {
				<img
					class="size-14"
					[alt]="'Logo de ' + place().name"
					[src]="logoUrl" />
			}
			<!-- Name and url -->
			<div class="flex flex-col gap-1">
				<h4 class="text-lg font-semibold text-primary-400">
					{{ place().name }}
					@if (place().url) {
						<span class="text-xs ml-2">
							<a class="text-blue-500" target="_blank" [href]="place().url">
								Voir le site <app-icon-external-link class="ml-1" />
							</a>
						</span>
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
		<p class="text-primary-800 max-w-prose">" {{ place().description }} "</p>
	`,
	imports: [LocationPinIcon, HouseLaptopIcon, ExternalLinkIcon],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceInfoComponent {
	readonly place = input.required<PlaceEntry>();
	readonly remotePolicy = input<RemotePolicy>();
}
