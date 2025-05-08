import type { JobEntry } from '../types/job/job.type';
import { validPlace } from './place.mock';
import { validFormattedRichText } from './rich-text.mock';

export const validJobInput = (name = 'Software Engineer'): JobEntry => ({
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
		{ name: 'TypeScript', level: 'avancé' },
		{ name: 'Angular', level: 'expert' },
	],
});
