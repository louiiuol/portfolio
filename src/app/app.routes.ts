import type { Route } from '@angular/router';

type ExtendedRoute = Route & { label?: string };
const hasLabel = (
	route: ExtendedRoute
): route is { label: string; path: string } =>
	'label' in route && !!route.label && route.path !== undefined;

export const routes: ExtendedRoute[] = [
	{
		path: '',

		loadComponent: () =>
			import('./features/home/home.page').then(m => m.HomePage),
		title: 'Louis Godlewski | Accueil',
		label: 'Accueil',
	},
	{
		path: 'cv',
		loadComponent: () =>
			import('./features/cv/pages/cv.page').then(m => m.CvPage),
		title: 'Louis Godlewski | Curriculum Vitae',
		label: 'CV',
	},
	{ path: '**', redirectTo: '' },
];

export const APP_LINKS = routes.filter(hasLabel).map(({ path, label }) => ({
	path: `/${path}`,
	label,
}));
export type AppLink = (typeof APP_LINKS)[number];
