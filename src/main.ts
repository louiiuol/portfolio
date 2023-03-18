import {HttpClientModule} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {
	PreloadAllModules,
	provideRouter,
	withPreloading,
} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app/app.component';
import {APP_ROUTES} from './app/app.routes';
import {NgxLoadingModule} from 'ngx-loading';

// registerLocaleData(localeFr, 'fr'); // Sets global angular's LOCALE to 'French'

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(HttpClientModule),
		importProvidersFrom(BrowserModule),
		importProvidersFrom(BrowserAnimationsModule),
		importProvidersFrom(
			NgxLoadingModule.forRoot({
				backdropBackgroundColour: 'rgba(#334277, 0.4)',
				animationType: 'double-bounce',
				primaryColour: '#334277',
			})
		),
		// TODO Compare with other preloading strategies
		provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
	],
}).catch(err => console.error(err));
