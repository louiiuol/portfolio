import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {
	PreloadAllModules,
	provideRouter,
	withPreloading,
} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {AppComponent} from './app/app.component';
import {APP_ROUTES} from './app/app.routes';

registerLocaleData(localeFr, 'fr'); // Sets global angular's LOCALE to 'French'

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(HttpClientModule),
		importProvidersFrom(BrowserAnimationsModule),
		provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
	],
}).catch(err => console.error(err));
