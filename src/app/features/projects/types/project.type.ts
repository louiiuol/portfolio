import type {
	AssetEntry,
	ProjectEntry,
	ProjectStatus,
	ProjectType,
} from '@feat/contentfull/types';
import type { Repo } from './repository.type';

export class Project {
	id: number;
	name: string;
	description: string;
	status: ProjectStatus;
	type: ProjectType;
	repo: Repo;
	assets?: AssetEntry[];

	constructor(contentfullInput: ProjectEntry, githubInput: Repo) {
		this.id = githubInput.id;
		this.name = contentfullInput.name;
		this.description = contentfullInput.description;
		this.type = contentfullInput.type;
		this.status = contentfullInput.status;
		this.repo = githubInput;
	}
}
