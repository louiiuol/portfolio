import type { PlaceEntry } from '../types';
import { validAsset } from './asset.mock';

export const validPlace: PlaceEntry = {
	id: 'Place1',
	name: 'Test Place',
	city: 'Test City',
	country: 'Test Country',
	description: 'This is a test place',
	logo: validAsset,
};
