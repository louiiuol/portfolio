import { ResourceStatus } from '@angular/core';

/**
 * Lightweight stand‑in for Angular “resource” returned by `resource()` helper.
 * Only the subset of methods used by the app / tests are reproduced.
 */
export function createMockResource<T>(initial: T) {
	let _status = ResourceStatus.Resolved;
	let _value: T = initial;
	return {
		status: () => _status,
		value: () => _value,
		error: () => null,
		isLoading: () => _status === ResourceStatus.Loading,
		/** Allow tests to mutate the inner value on-the-fly. */
		__set: (val: T) => {
			_value = val;
		},
		/** INTERNAL – mutate status in a type-unsafe way (cast to `any` in specs). */
		__setStateUnsafe: (s: ResourceStatus) => {
			_status = s;
		},
	} as const;
}
