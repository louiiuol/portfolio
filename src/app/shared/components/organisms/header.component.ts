import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_LINKS } from '../../../app.routes';
import { ButtonComponent } from '../atoms/button/button.component';
import { IconLogoComponent } from '../atoms/icon/icon-logo.component';


@Component({
	selector: 'app-header',
	host: {
		class:
			'flex justify-between items-center px-6 py-3 shadow',
	},
	template: `
		<app-icon-logo class="size-12" />
		<ul
			role="navigation"
			class="flex items-center justify-end gap-3">
			@for (link of navigationLinks; track $index) {
				<li>
					<a
            app-button
            rounded
            appearance="basic"
            color="primary"
            [routerLink]="'/' + link.path"
            [routerLinkActive]="'active'"
          >
						{{ link .label}}
					</a>
				</li>
			}
		</ul>
	`,
	imports: [RouterLink, RouterLinkActive, IconLogoComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	protected readonly navigationLinks = APP_LINKS;
}
