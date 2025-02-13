import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/organisms/footer.component';
import { HeaderComponent } from './shared/components/organisms/header.component';

@Component({
	selector: 'app-root',
  host: {class: 'flex flex-col h-screen'},
	template: `
    <app-header />
    <main class="pt-3 flex-1 overflow-y-auto">
      <h1 class="text-primary-500 w-full text-center text-2xl font-medium">
        Welcome to my {{ title }}
      </h1>
      <router-outlet />
    </main>
    <app-footer />
	`,
	imports: [RouterOutlet, HeaderComponent, FooterComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'portfolio';
}
