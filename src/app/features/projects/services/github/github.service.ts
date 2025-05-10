import { inject, Injectable, resource } from '@angular/core';
import { sleep } from '@shared/functions';
import { LocalStorageService } from '@shared/services';
import { z } from 'zod';
import { githubReposSchema, type Repo } from '../../types/repository.type';

@Injectable({ providedIn: 'root' })
export class GithubService {
	readonly repositories = resource({
		loader: async () =>
			(await this.getLocalRepositories()) ?? this.fetchGithubRepos('louiiuol'),
	});

	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'github-repositories';

	private async getLocalRepositories(): Promise<Repo[] | null> {
		const localEntries = this.localStorageService.get(
			this.localStorageKey,
			z.object({
				repositories: githubReposSchema,
				updatedAt: z.coerce.date(),
			})
		);

		if (!localEntries) {
			return null;
		}

		// If stored value is older than 2 days, return null and remove it from local storage
		const twoDaysDuration = 1000 * 60 * 60 * 24 * 2;
		const twoDaysAgo = Date.now() - twoDaysDuration;

		if (new Date(localEntries.updatedAt).getTime() < twoDaysAgo) {
			this.localStorageService.remove(this.localStorageKey);
			return null;
		}

		await sleep(1000);
		return localEntries.repositories;
	}

	private async fetchGithubRepos(username: string) {
		const limit = 100;
		const res = await fetch(
			`https://api.github.com/users/${username}/repos?per_page=${limit}`
		);

		if (!res.ok) {
			throw new Error(`GitHub API error: ${res.status}`);
		}

		const parsed = githubReposSchema.safeParse(await res.json());
		if (!parsed.success) {
			console.error(parsed.error.flatten());
			throw new Error('Validation failed for GitHub repositories');
		}

		this.localStorageService.set(this.localStorageKey, {
			repositories: parsed,
			updatedAt: new Date(),
		});

		return parsed.data;
	}
}
