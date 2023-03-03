import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [RouterOutlet, ButtonModule],
	template: ` <button pButton type="button">Welcome to my {{ title }} !</button>
		<router-outlet></router-outlet>`,
})
export class AppComponent {
	title = 'portfolio';
}
