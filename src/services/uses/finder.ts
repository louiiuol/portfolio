import { ref } from "vue";

const arrayRef = ref([{}]);

/**
 * Find index of first element matching given property name in array
 * @param property name of filter property
 * @param propertyValue value to be asserted
 * @returns {number} index of element or {-1} if no element were found
 */
const findIndexBy = function(
	property: string,
	propertyValue: number | string | boolean
): number {
	if (propertyValue) {
		for (let i = 0; i < arrayRef.value.length; i += 1)
			if (Object.assign(arrayRef.value[i])[property] === propertyValue)
				return i;
	}
	return -1;
};

/**
 * Utilitray library to ease element search in array
 * @param array to be searche
 */
export default function useFinder(inputArray: {}[]) {
	arrayRef.value = inputArray;
	return { findIndexBy };
}
