import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
		title: 'Accueil',
	},
	{ path: '**', redirectTo: '' },
];

export const APP_LINKS = routes.map(({ path, title }) => ({
	path,
	label: title,
}));
