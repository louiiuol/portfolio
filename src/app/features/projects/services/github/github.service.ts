import { isPlatformBrowser } from '@angular/common';
import {
	inject,
	Injectable,
	PLATFORM_ID,
	resource,
	signal,
} from '@angular/core';
import { sleep } from '@shared/functions';
import { LocalStorageService } from '@shared/services';
import { z } from 'zod';
import { githubReposSchema, type Repo } from '../../types/repository.type';

@Injectable({ providedIn: 'root' })
export class GithubService {
	readonly repositories = resource({
		request: () => ({ isBrowser: this.isBrowser() }),
		loader: async ({ request }) =>
			request.isBrowser
				? ((await this.getLocalRepositories()) ?? this.fetchGithubRepos())
				: Promise.resolve(null),
	});

	private readonly localStorageService = inject(LocalStorageService);

	private readonly localStorageKey = 'github-repositories';
	private readonly isBrowser = signal(isPlatformBrowser(inject(PLATFORM_ID)));

	private async getLocalRepositories(): Promise<Repo[] | null> {
		if (!this.isBrowser()) {
			return Promise.resolve(null);
		}

		const localEntries = this.localStorageService.get(
			this.localStorageKey,
			z.object({
				repositories: githubReposSchema,
				updatedAt: z.coerce.date(),
			})
		);

		if (!localEntries) {
			return Promise.resolve(null);
		}

		await sleep(600); // Simulate network delay to detect loading state in dev only

		// If stored value is older than 2 days, return null and remove it from local storage
		const twoDaysDuration = 1000 * 60 * 60 * 24 * 2;

		if (
			new Date(localEntries.updatedAt).getTime() <
			Date.now() - twoDaysDuration
		) {
			this.localStorageService.remove(this.localStorageKey);
			return Promise.resolve(null);
		}

		return Promise.resolve(localEntries.repositories);
	}

	private async fetchGithubRepos() {
		const res = await fetch(
			`https://api.github.com/users/louiiuol/repos?per_page=100`
		);

		if (!res.ok) {
			throw new Error(`GitHub API error: ${res.status}`, {
				cause: await res.json(),
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
