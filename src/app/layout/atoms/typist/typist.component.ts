import {CommonModule} from '@angular/common';
import {Component, HostBinding, Input, OnChanges} from '@angular/core';

/**
 * Sentences display,  w/ typing & erasing effects, in a "terminal" styled box.
 * This Component is highly customizable: check Input() for more information.
 * @author louiiuol
 * @version 0.1.0
 */
@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'lou-typist',
	styleUrls: ['./typist.component.scss'],
	templateUrl: './typist.component.html',
})
export class TypistComponent implements OnChanges {
	/**
	 * Array of sentences to be displayed
	 */
	@Input() toType: string[] = [];

	/**
	 * Defines if typing animation should restart from begin when finished
	 */
	@Input() infinite = false;

	/**
	 * Defines Typing speed (bigger number means slower)
	 */
	@Input() typingSpeed = 80;

	/**
	 * Defines erasing speed (bigger number means slower)
	 */
	@Input() erasingSpeed = 45;

	/**
	 * Defines delay between each sentence (bigger number means slower)
	 */
	@Input() newTextDelay = 1.5;

	@Input() startingDelay = 1.5;

	@HostBinding('class') class =
		'inline-flex align-items-center px-4 py-2 surface-card border-primary shadow-4 mx-auto border-round-sm text-caveat';

	typingValue = '';
	isTyping = false;
	isDoneTyping = false;

	private charIndex = 0;
	private typingArrayIndex = 0;

	private get typingArray(): string[] {
		return this.toType.map(el => el.trim());
	}

	private get currentString(): string {
		return this.typingArray[this.typingArrayIndex];
	}

	ngOnChanges(): void {
		if (this.toType.length)
			setTimeout(this.typeText, this.startingDelay * 1000);
	}

	private typeText = (): void => {
		if (this.charIndex < this.currentString.length) {
			this.isTyping = true;
			this.typingValue += this.currentString.charAt(this.charIndex);
			this.charIndex += 1;
			setTimeout(this.typeText, this.typingSpeed);
		} else {
			this.isTyping = false;
			if (this.typingArrayIndex < this.typingArray.length - 1 || this.infinite)
				setTimeout(this.eraseText, this.newTextDelay * 1000);
			if (
				this.typingArrayIndex === this.typingArray.length - 1 &&
				!this.infinite
			)
				this.isDoneTyping = true;
		}
	};

	private eraseText = (): void => {
		if (this.charIndex > 0) {
			if (!this.isTyping) this.isTyping = true;
			this.typingValue = this.currentString.substring(0, this.charIndex - 1);
			if (this.erasingSpeed > 10) this.erasingSpeed--;
			this.charIndex -= 1;
			setTimeout(this.eraseText, this.erasingSpeed);
		} else {
			this.isTyping = false;
			this.typingArrayIndex += 1;
			if (this.typingArrayIndex >= this.typingArray.length)
				this.typingArrayIndex = 0;
			this.erasingSpeed = 45;
			setTimeout(this.typeText, this.typingSpeed + 1000);
		}
	};
}
