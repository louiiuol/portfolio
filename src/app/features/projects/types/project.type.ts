import type {
	AssetEntry,
	FormattedRichText,
	ProjectEntry,
	ProjectStatus,
	ProjectType,
} from '@feat/contentful/types';
import type { nullish } from '@shared/types';
import type { Repo } from './repository.type';

export class Project {
	id: string | nullish;
	name: string;
	description: FormattedRichText;
	status: ProjectStatus;
	type: ProjectType;
	repo: Repo | null;
	assets?: AssetEntry[];

	constructor(contentfulInput: ProjectEntry, githubInput: Repo | null) {
		this.id = contentfulInput.id;
		this.name = contentfulInput.name;
		this.description = contentfulInput.description;
		this.type = contentfulInput.type;
		this.status = contentfulInput.status;
		this.repo = githubInput;
		this.assets = contentfulInput.assets ?? [];
	}
}
