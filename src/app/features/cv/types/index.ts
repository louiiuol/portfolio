export { diplomaSchema, type Diploma } from './diploma/diploma.type';
export {
	isJob,
	isJobInput,
	Job,
	jobSchema,
	type RemotePolicy,
} from './job/job.type';
export { placeSchema, type Place } from './place/place.type';

export {
	EVENT_TYPES,
	type ContractType,
	type CvEventType,
} from './cv-event/cv-event-type.type';
export { CvEvent, type CvEventField } from './cv-event/cv-event.type';
export { isSkill, skillSchema, type Skill } from './skill/skill.type';
export { isTraining, Training, trainingSchema } from './training/training.type';
