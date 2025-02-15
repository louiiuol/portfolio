import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
		title: 'Accueil',
	},
	{ path: '**', redirectTo: '' },
];

export const APP_LINKS = routes
	.filter(r => r.path !== '**')
	.map(({ path, title }) => ({
		path,
		label: title,
	}));
