import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	host: { class: 'p-4 text-center text-primary-300' },
	template: `
		<p class="text-sm">
			Fait avec ❤️ et beaucoup de ☕️ en <span class="font-semibold ">2025</span>
		</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
