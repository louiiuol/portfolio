import type { Skill } from '@feat/skills/types/skill.type';
import type { Asset } from '../../../shared/types/asset.type';

export type Job = {
	company: Company;
	remotePolicy: 'à distance' | 'hybride' | 'sur site';
	contractType: 'cdi' | 'cdd' | 'freelance' | 'alternance' | 'stage';
	experiences: Experience[];
	assets: Asset[];
	skills: Skill[];
};

export type Company = {
	slug: string;
	name: string;
	city: string;
	country: string;
	logo: boolean;
	url?: string;
};

export type Experience = {
	jobTitle: string;
	description: string;
	startDate: string;
	endDate?: Date;
};
