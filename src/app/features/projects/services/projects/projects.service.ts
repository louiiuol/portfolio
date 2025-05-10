import { computed, inject, Injectable } from '@angular/core';
import { ContentfulService } from '@feat/contentful/services/contentful/contentful.service';
import { isNotNullish } from '@shared/types';
import { Project } from '../../types/project.type';
import { GithubService } from '../github/github.service';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
	private readonly contentfulService = inject(ContentfulService);
	private readonly githubService = inject(GithubService);

	readonly projects = computed(() => {
		const repositories = this.githubService.repositories.value();
		const entries = this.contentfulService.entries.value()?.project;

		// handle states (error, loading - here)

		if (!repositories || !entries) {
			console.log('Aucune donnée disponibles', { repositories, entries });
			return [];
		}

		return entries
			.map(entry => {
				const repo = repositories.find(r => r.id === entry.githubId);
				if (!repo) {
					console.log('Aucun repository trouvé pour le projet: ' + entry.name);
					return null;
				}
				return new Project(entry, repo);
			})
			.filter(isNotNullish);
	});
}
