import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
} from '@angular/core';

import {
	Card,
	ErrorMessageComponent,
	LoaderComponent,
} from '@shared/components';

import { CvFiltersComponent } from '../components/cv/cv-filters.component';
import { CvSortComponent } from '../components/cv/cv-sort.component';
import { CvTimelineComponent } from '../components/cv/cv-timeline.component';
import { EventDialog } from '../components/event/event-dialog.component';
import { CvService } from '../services/cv.service';

@Component({
	selector: 'app-cv-page',
	host: { class: 'page' },
	template: `
		<app-card
			class="min-h-full  max-w-[1024px] w-full mx-auto !rounded-none sm:!rounded-lg">
			<h1 heading>Curriculum Vitae</h1>
			<nav class="flex gap-4 sm:gap-6 justify-between items-start" subHeader>
				<app-cv-filters />
				<app-cv-sort class="ml-auto" />
			</nav>

			<!-- Main content -->
			@if (cvService.sortedEvents().loading) {
				<app-loader message="chargement des informations du CV" />
			} @else if (cvService.sortedEvents().error) {
				<app-error-message [errorMessage]="errorMessage" />
			} @else {
				<app-cv-timeline [events]="cvService.sortedEvents().data" />
			}
		</app-card>

		<!-- Job Modal -->
		<app-event-dialog [event]="cvService.activeEvent()" />
	`,
	imports: [
		LoaderComponent,
		CvTimelineComponent,
		EventDialog,
		Card,
		ErrorMessageComponent,
		CvFiltersComponent,
		CvSortComponent,
	],
	providers: [CvService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPage {
	readonly eventId = input<string>();
	private readonly syncEventIdWithActiveEvent = effect(() =>
		this.cvService.setActiveEvent(this.eventId())
	);

	protected readonly cvService = inject(CvService);

	protected readonly errorMessage =
		'Impossible de récupérer les informations du CV. Merci de réessayer plus tard... 🙏';
}
