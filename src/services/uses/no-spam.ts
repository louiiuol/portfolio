import { ref } from "vue";

// Vue ref storing callback's state (called or not)
const isTriggered = ref(false);

/**
 * Prevents from user event's spaming, by setting a timeout
 * before calling the callback function in params
 * @param callback function to be called
 * @param timing to wait before enabling action again
 */
export default function useNoSpam(callback: Function, timing = 1500) {
	if (!isTriggered.value) {
		isTriggered.value = true;
		const fn = callback();
		// wait timing value in ms before enable the callback fn again
		window.setTimeout(() => (isTriggered.value = false), timing);
		return fn;
	}
}
