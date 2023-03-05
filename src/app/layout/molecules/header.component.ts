import {CommonModule} from '@angular/common';
import {Component, HostBinding} from '@angular/core';

@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'vp-header',
	template: `
		<a href=""><span>Louis Godlewski</span></a>
		<ul class="links">
			<li><a href="">about</a></li>
			<li><button href="">contact</button></li>
		</ul>
	`,
})
export class HeaderComponent {
	@HostBinding('class') class = '';
}
