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
