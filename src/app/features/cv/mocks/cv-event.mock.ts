import { validJobInput } from '../../contentfull/mocks/job.mock';
import { validTrainingInput } from '../../contentfull/mocks/training.mock';
import type { CvEventInput } from '../types/cv-event/cv-event.type';

export const validCvEventInput = (type: 'job' | 'training'): CvEventInput =>
	type === 'job' ? validJobInput() : validTrainingInput();
