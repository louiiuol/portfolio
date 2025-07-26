import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
	ButtonComponent,
	ExternalLinkIcon,
	LogoIcon,
} from '@shared/components';
import { APP_LINKS } from '../../../app.routes';

@Component({
	selector: 'app-header',
	host: {
		class: 'flex justify-between items-center px-3 sm:px-6 py-1 sm:py-3 shadow',
	},
	template: `
		<app-icon-logo class="size-12" />
		<ul class="flex items-center justify-end gap-3" role="navigation">
			@for (link of navigationLinks; track $index) {
				<li>
					@if (link.internal) {
						<a
							app-button
							appearance="basic"
							color="primary"
							[routerLink]="link.path"
							[routerLinkActive]="'active'"
							[routerLinkActiveOptions]="{ exact: true }">
							{{ link.label }}
						</a>
					} @else {
						<a
							app-button
							appearance="basic"
							color="primary"
							rel="noopener noreferrer"
							target="_blank"
							[href]="link.path">
							{{ link.label }}
							<app-icon-external-link
								class="text-blue-500"
								aria-hidden="true" />
						</a>
					}
				</li>
			}
		</ul>
	`,
	imports: [
		RouterLink,
		RouterLinkActive,
		LogoIcon,
		ButtonComponent,
		ExternalLinkIcon,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	protected readonly navigationLinks = [
		...APP_LINKS.map(l => ({ ...l, internal: true })),
		{
			internal: false,
			path: 'https://github.com/louiiuol?tab=repositories&q=&type=&language=&sort=stargazers',
			label: 'Projets',
		},
	];
}
