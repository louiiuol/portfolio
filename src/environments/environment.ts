import { contentftullEnv } from './contentfull.env';
import type { AppEnvironment } from './type';

export const environment: AppEnvironment = {
	production: true,
	contentftull: contentftullEnv,
};
