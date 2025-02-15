import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/organisms/header.component';

@Component({
	selector: 'app-root',
  host: {class: 'flex flex-col h-screen'},
	template: `
    <app-header />
    <main class="flex-1 overflow-y-auto">
      <router-outlet />
    </main>
    <!-- <app-footer /> -->
	`,
	imports: [RouterOutlet, HeaderComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
