import { ref } from "vue";

export default function useToggle() {
	const isToggled = ref(false);
	const toggle = function(): void {
		isToggled.value = false;
	};
	return { isToggled, toggle };
}
