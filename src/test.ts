import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import 'zone.js/testing'; // Import Angular Zone.js pour les tests

// Cela permet de charger tous les fichiers .spec.ts
declare const require: {
	context(
		path: string,
		deep?: boolean,
		filter?: RegExp
	): {
		keys(): string[];
		<T>(id: string): T;
	};
};

// Initialise l'environnement de test Angular
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

// Cherche tous les tests dans le projet
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
