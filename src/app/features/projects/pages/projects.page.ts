import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorMessageComponent, LoaderComponent } from '@shared/components';
import { ProjectCard } from '../components/project-card/project-card.component';
import { ProjectsService } from '../services/projects/projects.service';

@Component({
	selector: 'app-project-page',
	host: { class: 'page justify-start items-center' },
	template: `
		@let projects = projectsService.projects();
		@if (projects.error) {
			<app-error-message
				class="bg-slate-100 rounded-lg text-center mx-auto py-4 flex -items-center justify-center max-w-5xl !mt-0 !flex-0"
				[errorMessage]="errorMessage" />
		} @else if (projects.loading) {
			<app-loader
				class="text-white font-medium text-xl"
				hideSpinner
				message="chargement des projets"
				theme="transparent" />
		} @else {
			@for (project of projects.data; track $index) {
				<app-project-card [project]="project" />
			}
		}
	`,
	imports: [LoaderComponent, ErrorMessageComponent, ProjectCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
	protected readonly projectsService = inject(ProjectsService);

	protected readonly errorMessage =
		'Impossible de récupérer les projets. Merci de réessayer plus tard... 🙏';
}
