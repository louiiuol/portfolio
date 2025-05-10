import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';

export const PROJECT_STATUS = [
	{ value: 'idea', label: 'Une idée' },
	{ value: 'draft', label: 'Brouillon' },
	{ value: 'in_progress', label: 'En développement' },
	{ value: 'done', label: 'Complété' },
] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number]['value'];
const ProjectStatusKeys = PROJECT_STATUS.map(p => p.value) as [
	ProjectStatus,
	...ProjectStatus[],
];

export const PROJECT_TYPES = [
	{ value: 'webapp', label: 'Application web' },
	{ value: 'poc', label: 'Proof of concept' },
	{ value: 'algo', label: 'Algorithmie' },
	{ value: 'ui', label: "Intégration d'interface" },
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number]['value'];
const ProjectTypeKeys = PROJECT_TYPES.map(p => p.value) as [
	ProjectType,
	...ProjectType[],
];

export const projectSchema = z.object({
	name: z.string(),
	description: z.string(),
	githubId: z.number(),
	status: z.enum(ProjectStatusKeys),
	type: z.enum(ProjectTypeKeys),
	assets: z.array(assetSchema).nullish().default([]),
});
export type ProjectEntry = z.infer<typeof projectSchema>;
