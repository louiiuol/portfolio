export type SortDirection = 'asc' | 'desc';

export type SortField<T> = {
	sortBy: T;
	direction: SortDirection;
};
