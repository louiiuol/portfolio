import { contentfulEnv } from './contentful.env';
import type { AppEnvironment } from './type';

export const environment: AppEnvironment = {
	production: false,
	contentful: contentfulEnv,
};
