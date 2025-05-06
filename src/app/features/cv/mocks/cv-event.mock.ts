import type { CvEventInput } from '../types/cv-event/cv-event.type';
import { validJobInput } from './job.mock';
import { validTrainingInput } from './training.mock';

export const validCvEventInput = (type: 'job' | 'training'): CvEventInput =>
	type === 'job' ? validJobInput : validTrainingInput;
