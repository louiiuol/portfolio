import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from '@shared/components';
import { ProjectsService } from '../services/projects/projects.service';

@Component({
	selector: 'app-project-page',
	host: { class: 'page' },
	template: `
		<app-card>
			<h1 heading>Les projects</h1>
			<div class="p-4">
				{{ projectsService.projects() | json }}
			</div>
		</app-card>
	`,
	imports: [Card, JsonPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
	protected readonly projectsService = inject(ProjectsService);
}
