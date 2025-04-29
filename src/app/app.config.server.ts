import type { ApplicationConfig } from '@angular/core';
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import type { ServerRoute } from '@angular/ssr';
import { provideServerRouting, RenderMode } from '@angular/ssr';
import { appConfig } from './app.config';

export const serverRoutes: ServerRoute[] = [
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering(), provideServerRouting(serverRoutes)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
