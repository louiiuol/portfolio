export type SortDirection = 'asc' | 'desc';

export type SortField<T> = {
	field: T;
	direction: SortDirection;
};
