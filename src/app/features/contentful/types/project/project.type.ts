import { z } from 'zod';
import { assetSchema } from '../asset/asset.type';
import { entrySchema } from '../entry.type';
import { formattedRichTextSchema } from '../rich-text/rich-text.type';

export const PROJECT_STATUS = [
	{ value: 'idea', label: 'Une idée', color: '#e9c46a', icon: '💡' },
	{ value: 'draft', label: 'Brouillon', color: '#264653', icon: '📝' },
	{
		value: 'in_progress',
		label: 'En développement',
		color: '#219ebc',
		icon: '🔄',
	},
	{ value: 'done', label: 'Complété', color: '#2a9d8f', icon: '✅' },
] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number]['value'];
const ProjectStatusKeys = PROJECT_STATUS.map(p => p.value) as [
	ProjectStatus,
	...ProjectStatus[],
];
export const getProjectStatusInfo = (status: ProjectStatus) => {
	return PROJECT_STATUS.find(p => p.value === status) ?? null;
};

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

export const projectSchema = entrySchema.extend({
	name: z.string(),
	description: formattedRichTextSchema,
	githubId: z.string().nullish(),
	status: z.enum(ProjectStatusKeys),
	type: z.enum(ProjectTypeKeys),
	assets: z.array(assetSchema).nullish().default([]),
});
export type ProjectEntry = z.infer<typeof projectSchema>;
