import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Observable } from 'rxjs';
import { concat, defer, from, of, timer } from 'rxjs';
import {
  concatMap,
  map,
  repeat,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';

type TypistState = {
	typingValue: string;
	isTyping: boolean;
	isDoneTyping: boolean;
};

/**
 * Typist component that types and erases sentences
 *
 * @example
 * <!-- Those are the default params -->
 * <lib-typist
 *  [toType]="['Hello World!', 'This is a typing effect.']"
 *  [infinite]="true"
 *  [typingSpeed]="50"
 *  [erasingSpeed]="45"
 *  [newTextDelay]="1.5"
 *  [startingDelay]="1.5"
 * />
 */
@Component({
	standalone: true,
	selector: 'app-typist',
	host: {
		class:
			'w-full max-w-screen inline-flex items-center px-4 py-2 bg-slate-200 text-slate-600 border-accent border hover:shadow-sm transition-all shadow-xl mx-auto rounded-lg text-caveat',
	},
	template: `
		<span class="text-accent font-semibold" id="lambda">~</span>
		<span class="mx-3">
			{{ (typingState$ | async)?.typingValue }}
		</span>
		<span
			class="inline-block mt-2 mb-3 font-semibold rounded-lg w-0.5 h-full bg-current animate-blink "
			id="cursor"
			style="transition: opacity 0.3s ease 0.6s"
			[class.animation-none]="(typingState$ | async)?.isTyping"
			[class.opacity-0]="(typingState$ | async)?.isDoneTyping">
			&nbsp;
		</span>
	`,
	imports: [AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypistComponent {
	/**
	 * Array of sentences to be displayed. Required
	 */
	toType = input.required<string[]>();

	/**
	 * Defines if typing animation should restart from begin when finished. Default: false
	 */
	infinite = input(false);

	/**
	 * Defines typing speed (larger number means slower). Default: 50
	 */
	typingSpeed = input(50);

	/**
	 * Defines erasing speed (larger number means slower). Default: 45
	 */
	erasingSpeed = input(45);

	/**
	 * Defines delay between each sentence (larger number means slower). Default: 1.5
	 */
	newTextDelay = input(1.5);

	/**
	 * Defines delay before starting typing (larger number means slower). Default: 1.5
	 */
	startingDelay = input(1.5);

	// Observable that emits the typing state
	typingState$: Observable<TypistState> = this.createTypingProcess().pipe(
		shareReplay(1)
	);

	private createTypingProcess() {
		return defer(() => {
			const sentences = this.toType().map(el => el.trim());

			if (!sentences.length) {
				return from([
					{ typingValue: '', isTyping: false, isDoneTyping: false },
				]);
			}

			// Observable that emits typing states for all sentences with their index
			const typingSequence$ = from(
				sentences.map((sentence, index) => ({ sentence, index }))
			).pipe(
				concatMap(({ sentence, index }) =>
					this.typeAndEraseSentence(
						sentence,
						index === sentences.length - 1 // Check if it's the last sentence
					)
				)
			);

			// Handle infinite looping
			const typingProcess$ = this.infinite()
				? typingSequence$.pipe(repeat())
				: typingSequence$;

			// Start after startingDelay
			return timer(this.startingDelay() * 1000).pipe(
				switchMap(() => typingProcess$)
			);
		});
	}

	private typeAndEraseSentence(sentence: string, isLastSentence: boolean) {
		const type$ = this.typeSentence(sentence);
		const erase$ = this.eraseSentence(sentence);

		if (this.infinite() || !isLastSentence) {
			// Proceed as before
			return concat(
				type$,
				// Delay after typing
				timer(this.newTextDelay() * 1000).pipe(
					map(() => ({
						typingValue: sentence,
						isTyping: false,
						isDoneTyping: false,
					}))
				),
				erase$,
				// Delay before next sentence
				timer(1000).pipe(
					map(() => ({
						typingValue: '',
						isTyping: false,
						isDoneTyping: false,
					}))
				)
			);
		} else {
			// For the last sentence when infinite is false, do not erase, emit final state
			return concat(
				type$,
				// Delay after typing
				timer(this.newTextDelay() * 1000).pipe(
					map(() => ({
						typingValue: sentence,
						isTyping: false,
						isDoneTyping: false,
					}))
				),
				// Emit final state with isDoneTyping: true
				of({
					typingValue: sentence,
					isTyping: false,
					isDoneTyping: true,
				})
			);
		}
	}

	private typeSentence(sentence: string): Observable<TypistState> {
		const letters = sentence.split('');
		return from(letters).pipe(
			concatMap((letter, index) =>
				timer(this.typingSpeed()).pipe(
					map(() => ({
						typingValue: sentence.substring(0, index + 1),
						isTyping: true,
						isDoneTyping: false,
					}))
				)
			)
		);
	}

	private eraseSentence(sentence: string): Observable<TypistState> {
		const letters = sentence.split('');
		let currentErasingSpeed = this.erasingSpeed();

		const indices = letters.map((_, index) => letters.length - index - 1);

		return from(indices).pipe(
			concatMap(index =>
				timer(currentErasingSpeed).pipe(
					tap(() => {
						// Decrease erasing speed
						if (currentErasingSpeed > 10) {
							currentErasingSpeed -= 1;
						}
					}),
					map(() => ({
						typingValue: sentence.substring(0, index),
						isTyping: true,
						isDoneTyping: false,
					}))
				)
			),
			// Reset erasing speed after completion
			tap({
				complete: () => {
					currentErasingSpeed = this.erasingSpeed();
				},
			})
		);
	}
}
