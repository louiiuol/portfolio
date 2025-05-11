import { computed, inject, Injectable } from '@angular/core';
import { ContentfulService } from '@feat/contentful/services/contentful/contentful.service';
import { Project } from '../../types/project.type';
import { GithubService } from '../github/github.service';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
	private readonly contentfulService = inject(ContentfulService);
	private readonly githubService = inject(GithubService);

	readonly projects = computed(() => {
		const repositoriesResource = this.githubService.repositories;
		const entriesResource = this.contentfulService.entries;

		const states = {
			loading: repositoriesResource.isLoading() || entriesResource.isLoading(),
			error: repositoriesResource.error() ?? entriesResource.error(),
		};

		const repositories = repositoriesResource.value();
		const entries = entriesResource.value()?.project;

		if (!entries || !repositories || states.loading || states.error) {
			return { ...states, data: [] };
		}

		return {
			...states,
			data: entries.map(entry => {
				const repo =
					repositories.find(r => r.id.toString() === entry.githubId) ?? null;
				return new Project(entry, repo);
			}),
		};
	});
}
