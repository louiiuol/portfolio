/**
 * Used by the tests to create a date event object.
 */
export const createDateEvent = (
	endDate?: string | null,
	startDate: string = '2023-01-01'
) => ({
	startDate: new Date(startDate),
	endDate: endDate ? new Date(endDate) : null,
});
