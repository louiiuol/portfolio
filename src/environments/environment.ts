import { contentfulEnv } from './contentful.env';
import type { AppEnvironment } from './type';

export const environment: AppEnvironment = {
	production: true,
	contentful: contentfulEnv,
};

// old domain: 188.165.61.82
