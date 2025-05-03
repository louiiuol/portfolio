import type { Place } from '../types';
import { validAsset } from './asset.mock';

export const validPlace: Place = {
	name: 'Test Place',
	city: 'Test City',
	country: 'Test Country',
	description: 'This is a test place',
	logo: validAsset,
};

export const invalidPlace = {
	name: 'Invalid Place',
	address: '123 Invalid St',
	postalCode: 12345, // Invalid type
	city: 'Invalid City',
	country: 'Invalid Country',
};
