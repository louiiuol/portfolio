import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

/**
 * Mock for ActivatedRoute that provides a params observable with given value as parameter.
 */
export const provideActivatedRouteMocked = (activeRouteParams?: unknown) => ({
	provide: ActivatedRoute,
	useValue: {
		params: of(activeRouteParams),
	},
});
