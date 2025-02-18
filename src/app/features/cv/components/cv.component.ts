import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { CvModule } from '../cv.module';
import { CVService } from '../services/cv.service';
import { JobCard } from './job-card.component';

@Component({
	selector: 'app-cv',
	template: `
		@if (!cvService.cvResource.isLoading()) {
			@if (cvService.cvResource.error()) {
				<p>
					Impossible de récupérer les informations du CV. Merci de réessayer
					plus tard.. 🙏
				</p>
			} @else {
				<nav class="w-full flex justify-start items-center gap-3">
					<span>skills</span>
					<span>sort</span>
					<span>Job type (cdi, stage ..)</span>
				</nav>

				<div class="flex flex-col gap-4 w-full p-4">
					@for (job of jobs(); track job.company.slug) {
						<app-job-card [job]="job" />
					}
				</div>
			}
		} @else {
			<p>Chargement des informations du CV ⏳</p>
		}
	`,
	imports: [CvModule, JobCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVComponent {
	protected readonly cvService = inject(CVService);

	protected readonly jobs = computed(
		() => this.cvService.cvResource.value()?.[1]
	);
}
