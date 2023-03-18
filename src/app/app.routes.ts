import {Routes} from '@angular/router';
import {AboutComponent} from './layout/pages/about/about.component';
import {HomeComponent} from './layout/pages/home/home.component';

export const APP_ROUTES: Routes = [
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
