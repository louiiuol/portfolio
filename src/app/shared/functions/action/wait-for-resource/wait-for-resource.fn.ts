import { ResourceStatus } from '@angular/core';
/* Generic helper to await ng resource status and value */
export async function waitForResourceResolved<T>(
	res: { status(): ResourceStatus; value(): T },
	timeout = 2000
): Promise<T> {
	const deadline = Date.now() + timeout;
	while (res.status() !== ResourceStatus.Resolved) {
		if (Date.now() > deadline) {
			throw new Error('Resource timeout');
		}
		await Promise.resolve(); // micro-tâche suivante
	}
	return res.value();
}
