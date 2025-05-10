import type {
	AssetEntry,
	ProjectEntry,
	ProjectStatus,
	ProjectType,
} from '@feat/contentful/types';
import type { Repo } from './repository.type';

export class Project {
	id: number;
	name: string;
	description: string;
	status: ProjectStatus;
	type: ProjectType;
	repo: Repo;
	assets?: AssetEntry[];

	constructor(contentfulInput: ProjectEntry, githubInput: Repo) {
		this.id = githubInput.id;
		this.name = contentfulInput.name;
		this.description = contentfulInput.description;
		this.type = contentfulInput.type;
		this.status = contentfulInput.status;
		this.repo = githubInput;
	}
}
