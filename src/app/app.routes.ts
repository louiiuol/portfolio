import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
		title: 'Louis Godlewski | Accueil',
	},
	{
		path: 'cv',
		loadComponent: () => import('./pages/cv/cv.page').then(m => m.CVPage),
		title: 'Louis Godlewski | CV',
	},
	{ path: '**', redirectTo: '' },
];

export const APP_LINKS = routes
	.filter(r => r.path !== '**')
	.map(({ path, title }) => ({
		path,
		label: title?.toString().replaceAll('Louis Godlewski | ', ''),
	}));
