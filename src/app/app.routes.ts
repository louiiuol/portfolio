import type { Route } from '@angular/router';

// const toto_routes = [
// 	{
// 		routePath: '',
// 		filePath: './features/home/home.page',
// 		metaTitle: 'Louis Godlewski | Accueil',
// 		metaDescription:
// 			"Coucou le monde ! Je suis Louis Godlewski, un développeur web passionné par le développement front-end et l'UX/UI design. Je suis ravi de vous accueillir sur mon portfolio !",
// 		label: 'Accueil',
// 		component: HomePage,
// 	},
// ];

// const rouuutes = toto_routes.map(route => ({
// 	path: route.routePath,
// 	loadComponent: () =>
// 		import(route.filePath).then(
// 			(m: { [key: string]: unknown }) =>
// 				m[route.component.name] as typeof route.component
// 		),
// }));

type ExtendedRoute = Route & { label?: string };
const hasLabel = (
	route: ExtendedRoute
): route is { label: string; path: string } =>
	'label' in route && !!route.label && !!route.path;

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
