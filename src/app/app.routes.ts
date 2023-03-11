import {Routes} from '@angular/router';
import {HomeComponent} from './layout/pages/home/home.component';

export const APP_ROUTES: Routes = [
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];
