import {Component, HostBinding, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/molecules/header.component';
import {PrimeNGConfig} from 'primeng/api';

@Component({
	standalone: true,
	selector: 'lou-root',
	imports: [RouterOutlet, HeaderComponent],
	template: `<!-- Global App Container -->
		<lou-header></lou-header>
		<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
	@HostBinding('class') class = 'h-screen block relative';

	constructor(private primengConfig: PrimeNGConfig) {}

	ngOnInit() {
		this.primengConfig.ripple = true;
	}
}
