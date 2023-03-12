<template>
	<component :is="tag" class="typist">
		<span class="lambda">λ</span> {{ typingValue }}
		<span class="cursor" :class="{ typing: isTyping }">&nbsp;</span>
	</component>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { setTimeout } from "timers";
import { i18n } from "@/main";

/* eslint-disable @typescript-eslint/no-use-before-define */
export default defineComponent({
	name: "Typist",
	props: {
		toType: { type: String, required: true },
		tag: { type: String, required: true },
		infinite: { type: Boolean, required: false }
	},
	setup(props) {
		const typingValue = ref(""),
			isTyping = ref(false),
			charIndex = ref(0),
			defaultLang = ref(i18n.global.locale),
			typingArrayIndex = ref(0),
			typingSpeed = 60,
			erasingSpeed = 35,
			newTextDelay = 200;

		const translation = computed(() => i18n.global.t(props.toType));
		const typingArray = computed(() =>
			translation.value.split("\n").map(el => el.trim())
		);
		const currentString = computed(
			() => typingArray.value[typingArrayIndex.value]
		);
		const lang = computed(() => i18n.global.locale);
		const handleLanguageChanges = function(): void {
			if (lang.value != defaultLang.value) {
				defaultLang.value = lang.value;
				charIndex.value = 0;
				typingValue.value = "";
				typingArrayIndex.value = 0;
			}
		};
		const typeText = function(): void {
			handleLanguageChanges();
			if (charIndex.value < currentString.value.length) {
				if (!isTyping.value) isTyping.value = true;
				typingValue.value += currentString.value.charAt(charIndex.value);
				charIndex.value += 1;
				setTimeout(typeText, typingSpeed);
			} else {
				isTyping.value = false;
				if (
					typingArrayIndex.value < typingArray.value.length - 1 ||
					props.infinite
				)
					setTimeout(eraseText, newTextDelay);
				else setInterval(handleLanguageChanges, 200);
			}
		};
		const eraseText = function(): void {
			handleLanguageChanges();
			if (charIndex.value > 0) {
				if (!isTyping.value) isTyping.value = true;
				typingValue.value = currentString.value.substring(
					0,
					charIndex.value - 1
				);
				charIndex.value -= 1;
				setTimeout(eraseText, erasingSpeed);
			} else {
				isTyping.value = false;
				typingArrayIndex.value += 1;
				if (typingArrayIndex.value >= typingArray.value.length)
					typingArrayIndex.value = 0;
				setTimeout(typeText, typingSpeed + 1000);
			}
		};
		setTimeout(typeText, 1000);
		return { typingValue, isTyping };
	}
});
</script>

<style lang="scss" scoped>
.typist {
	font-family: open24, sans-serif;
	font-weight: normal;
	position: relative;
	background-color: rgba($legend-dark, 0.8);
	border-radius: $radius-md;
	padding: $pad-md;
	display: inline-block;
	@include shadowed(true);
	max-width: 80vw;
	margin: 0 auto;
	font-size: 2rem;
	span.lambda {
		color: $accent;
	}
	span.cursor {
		$cursor-width: 3px;
		display: inline-block;
		margin-left: $cursor-width;
		padding-bottom: 5px;
		width: $cursor-width;
		background-color: currentColor;
		animation: blink $transition-medium infinite;
	}
	span.cursor.typing {
		animation: none;
	}
}
</style>
