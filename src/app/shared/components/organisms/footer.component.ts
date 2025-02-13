import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../atoms/button/button.component';

@Component({
  selector: 'app-footer',
  host: { class: 'p-4 text-center text-primary-300' },
  template: `
    <p>
        Made with ❤️ and ☕️ by
        <a
          href="https://github.com/louiiuol"
          rounded
          color="primary"
          app-button
          appearance="basic"
          target="_blank"
        >
          louiiuol
        </a>
      </p>
  `,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
