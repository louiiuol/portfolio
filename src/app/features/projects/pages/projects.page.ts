import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	Card,
	ErrorMessageComponent,
	LoaderComponent,
} from '@shared/components';
import { ProjectCard } from '../components/project-card/project-card.component';
import { ProjectsService } from '../services/projects/projects.service';

@Component({
	selector: 'app-project-page',
	host: { class: 'page' },
	template: `
		<app-card>
			<h1 heading>Les projets arrivent</h1>
			@if (projectsService.projects().loading) {
				<app-loader message="chargement des projets" />
			} @else if (projectsService.projects().error) {
				<app-error-message [errorMessage]="errorMessage" />
			} @else {
				@for (project of projectsService.projects().data; track $index) {
					<app-project-card [project]="project" />
				}
			}
		</app-card>
	`,
	imports: [Card, LoaderComponent, ErrorMessageComponent, ProjectCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
	protected readonly projectsService = inject(ProjectsService);

	protected readonly errorMessage =
		'Impossible de récupérer les projets. Merci de réessayer plus tard... 🙏';
}
