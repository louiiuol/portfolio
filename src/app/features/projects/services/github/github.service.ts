import { inject, Injectable, resource } from '@angular/core';
import { LocalStorageService } from '@shared/services';
import { z } from 'zod';
import { githubReposSchema, type Repo } from '../../types/repository.type';

@Injectable({ providedIn: 'root' })
export class GithubService {
	readonly repositories = resource({
		loader: async () => this.getLocalRepositories() ?? this.fetchGithubRepos(),
	});

	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'github-repositories';

	private getLocalRepositories(): Repo[] | null {
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

		if (
			new Date(localEntries.updatedAt).getTime() <
			Date.now() - twoDaysDuration
		) {
			this.localStorageService.remove(this.localStorageKey);
			return null;
		}

		return localEntries.repositories;
	}

	private async fetchGithubRepos() {
		const res = await fetch(
			`https://api.github.com/users/louiiuol/repos?per_page=100`
		);

		if (!res.ok) {
			let payload: unknown;
			try {
				payload = await res.json();
			} catch {
				payload = await res.text(); // may still fail but keeps raw body
			}
			throw new Error(`GitHub API error: ${res.status}`, {
				cause: payload,
			});
		}

		const parsed = githubReposSchema.safeParse(await res.json());
		if (!parsed.success) {
			console.error(parsed.error.flatten());
			throw new Error('Validation failed for GitHub repositories');
		}

		const repositories = parsed.data;

		this.localStorageService.set(this.localStorageKey, {
			repositories,
			updatedAt: new Date(),
		});

		return repositories;
	}
}
