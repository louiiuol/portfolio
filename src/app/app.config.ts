import type { ApplicationConfig } from '@angular/core';
import { LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import {
	provideRouter,
	withComponentInputBinding,
	withInMemoryScrolling,
	withViewTransitions,
} from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { PrimeCustomPreset } from './core/prime-custom.theme';

// Register locale data
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withComponentInputBinding(),
			withViewTransitions(),
			withInMemoryScrolling({ scrollPositionRestoration: 'top' })
		),
		provideClientHydration(withEventReplay()),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		providePrimeNG({
			theme: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				preset: PrimeCustomPreset,
				options: {
					darkModeSelector: false,
					cssLayer: false,
				},
			},
		}),
	],
};
