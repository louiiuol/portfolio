import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
} from '@angular/core';

import { ContentfullModule } from '@feat/contentfull/contentfull.module';
import { Card, LoaderComponent } from '@shared/components';
import { CvTimelineComponent, EventDialog } from '../components';
import { CvService } from '../services/cv.service';

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<app-card
			class="min-h-full  max-w-[1024px] w-full mx-auto !rounded-none sm:!rounded-lg">
			<h1 heading>Curriculum Vitae</h1>

			@if (cvService.sortedEvents().loading) {
				<app-loader message="chargement des informations du CV" />
			} @else if (cvService.sortedEvents().error) {
				<p
					class="text-gray-700 italic max-w-prose text-pretty text-center mt-6 mx-auto">
					Impossible de récupérer les informations du CV. Merci de réessayer
					plus tard... 🙏
				</p>
			} @else {
				<app-cv-timeline
					[events]="cvService.sortedEvents().data"
					(setActiveEvent)="cvService.setActiveEvent($event)" />
			}
		</app-card>

		<!-- Job Modal -->
		<app-event-dialog
			[event]="cvService.activeEvent()"
			(setActiveEvent)="switchActiveEvent($event)" />
	`,
	imports: [
		ContentfullModule,
		LoaderComponent,
		CvTimelineComponent,
		EventDialog,
		Card,
	],
	providers: [CvService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPage {
	// I/O
	readonly eventId = input<string>();

	protected readonly cvService = inject(CvService);

	// Sync active job with the URL query params
	private readonly syncJobId = effect(() =>
		this.cvService.setActiveEvent(this.eventId())
	);

	protected switchActiveEvent(target: 'previous' | 'next' | null): void {
		if (target === 'previous' || target === 'next') {
			this.cvService.slideEvent(target);
		} else {
			this.cvService.setActiveEvent(target);
		}
	}
}
