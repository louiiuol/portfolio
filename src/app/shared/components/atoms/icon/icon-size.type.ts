import type { TailwindSizes } from '@shared/types';

export type IconSize =
	| `size-${TailwindSizes}`
	| `w-${TailwindSizes}`
	| `h-${TailwindSizes}`;
