import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorMessageComponent } from '@shared/components';
import { ProjectCard } from '../components/project-card/project-card.component';
import { ProjectsService } from '../services/projects/projects.service';

@Component({
	selector: 'app-project-page',
	host: { class: 'page justify-start items-center' },
	template: `
		@let projects = projectsService.projects();
		@if (projects.error) {
			<app-error-message
				class="bg-slate-100 rounded-lg text-center mx-auto py-4 flex items-center justify-center max-w-5xl !mt-0 !flex-0"
				errorMessage="Impossible de récupérer les projets. Merci de réessayer plus tard... 🙏" />
		} @else if (projects.loading) {
			<p class="text-lg text-center py-2 text-white font-medium">
				Chargement des projets
			</p>
		} @else {
			@for (project of projects.data; track $index) {
				<app-project-card [project]="project" />
			}
		}
	`,
	imports: [ErrorMessageComponent, ProjectCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
	protected readonly projectsService = inject(ProjectsService);
}
