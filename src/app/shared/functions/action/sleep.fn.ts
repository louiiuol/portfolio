/**
 * A function that returns a promise that resolves after a specified number of milliseconds.
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
