import { inject, Injectable, resource } from '@angular/core';
import { LocalStorageService } from '@shared/services';
import { z } from 'zod';

const ownerSchema = z.object({
	login: z.string(),
	id: z.number(),
	avatar_url: z.string().url(),
	html_url: z.string().url(),
});

const licenseSchema = z.object({
	key: z.string(),
	name: z.string(),
	url: z.string().url(),
});

const repoSchema = z.object({
	id: z.number(),
	name: z.string(),
	owner: ownerSchema,
	html_url: z.string().url(),
	description: z.string().nullish(),
	fork: z.boolean(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	pushed_at: z.string().datetime(),
	git_url: z.string(),
	ssh_url: z.string(),
	clone_url: z.string().url(),
	homepage: z.string().nullish(),
	size: z.number(),
	stargazers_count: z.number(),
	watchers_count: z.number(),
	language: z.string().nullish(),
	has_issues: z.boolean(),
	has_projects: z.boolean(),
	has_downloads: z.boolean(),
	has_wiki: z.boolean(),
	has_pages: z.boolean(),
	has_discussions: z.boolean(),
	forks_count: z.number(),
	mirror_url: z.string().nullish(),
	archived: z.boolean(),
	disabled: z.boolean(),
	open_issues_count: z.number(),
	license: licenseSchema.nullish(),
	allow_forking: z.boolean(),
	is_template: z.boolean(),
	topics: z.array(z.string()),
	forks: z.number(),
	open_issues: z.number(),
	watchers: z.number(),
});

export type Repo = z.infer<typeof repoSchema>;

export const githubReposSchema = z.array(repoSchema);

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
