import { validFormattedRichText } from '@feat/contentfull/mocks';
import type { JobInput } from '../types/job/job.type';
import { validPlace } from './place.mock';

export const validJobInput: JobInput = {
	company: validPlace,
	remotePolicy: 'à distance',
	contractType: 'cdi',
	title: 'Software Engineer',
	summary: 'Developing software solutions.',
	description: validFormattedRichText,
	startDate: new Date(),
	endDate: null,
	assets: null,
	skills: [{ name: 'TypeScript', level: 'avancé' }],
};
