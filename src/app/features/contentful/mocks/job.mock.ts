import type { JobEntry } from '../types/job/job.type';
import { validPlace } from './place.mock';
import { validFormattedRichText } from './rich-text.mock';

export const validJobInput = (name = 'Software Engineer'): JobEntry => ({
	id: 'Job1',
	company: validPlace,
	remotePolicy: 'à distance',
	contractType: 'cdi',
	title: name,
	summary: 'Developing software solutions.',
	description: validFormattedRichText,
	startDate: new Date(),
	endDate: null,
	assets: null,
	skills: [
		{ id: 'skill1', name: 'TypeScript', level: 'avancé' },
		{ id: 'skill2', name: 'Angular', level: 'expert' },
	],
});
