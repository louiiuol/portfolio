import { validJobInput } from '../../contentful/mocks/job.mock';
import { validTrainingInput } from '../../contentful/mocks/training.mock';
import type { CvEventInput } from '../types/cv-event/cv-event.type';

export const validCvEventInput = (type: 'job' | 'training'): CvEventInput =>
	type === 'job' ? validJobInput() : validTrainingInput();
