import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../atoms/button/button.component';
import { IconLogoComponent } from '../atoms/icon/icon-logo.component';

@Component({
	selector: 'app-header',
	host: {
		class:
			'flex justify-between items-center px-6 py-2 shadow',
	},
	template: `
		<app-icon-logo class="size-8" />
		<ul
			role="navigation"
			class="flex items-center justify-end gap-3">
			@for (link of navigationLinks; track $index) {
				<li>
					<a
            app-button
            rounded
            appearance="basic"
            size="small"
            color="primary"
            [routerLink]="'/' + link"
          >
						{{ link }}
					</a>
				</li>
			}
		</ul>
	`,
	imports: [RouterLink,  IconLogoComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	protected readonly navigationLinks = [];
}
