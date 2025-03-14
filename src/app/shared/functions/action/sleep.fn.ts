/**
 * A function that returns a promise that resolves after a specified number of milliseconds.
 * This is useful for creating delays in asynchronous code.
 * @param ms - The number of milliseconds to wait before resolving the promise.
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
