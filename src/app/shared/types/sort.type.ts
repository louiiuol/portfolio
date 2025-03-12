export type SortDirection = 'asc' | 'desc';

export type SortField<T> = {
	value: T;
	direction: SortDirection;
};
