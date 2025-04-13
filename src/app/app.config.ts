/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ApplicationConfig } from '@angular/core';
import { LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import {
	provideRouter,
	withComponentInputBinding,
	withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

// source: https://primeng.org/theming#primary
const PrimeCustomPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '#dde1ff',
			100: '#b8c3ff',
			200: '#99a7ee',
			300: '#7f8dd2',
			400: '#6573b6',
			500: '#4c5a9b',
			600: '#404e8e',
			700: '#344282',
			800: '#283675',
			900: '#1b2b6a',
			950: '#001355',
		},
	},
});

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
		provideClientHydration(withEventReplay()),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		providePrimeNG({
			theme: {
				preset: PrimeCustomPreset,
				options: {
					darkModeSelector: false,
					cssLayer: false,
				},
			},
		}),
	],
};
