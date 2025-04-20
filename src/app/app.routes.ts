import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/home/home.page').then(m => m.HomePage),
		title: 'Louis Godlewski | Accueil',
	},
	{
		path: 'cv',
		loadComponent: () =>
			import('./features/cv/pages/cv.page').then(m => m.CvPage),
		title: 'Louis Godlewski | Curriculum Vitae',
	},
	{ path: '**', redirectTo: '' },
];

export const APP_LINKS = routes
	.filter(r => r.path !== '**')
	.map(({ path, title }) => ({
		path,
		label: title?.toString().replaceAll('Louis Godlewski | ', ''),
	}));
