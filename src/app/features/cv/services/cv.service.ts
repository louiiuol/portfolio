import { inject, Injectable } from '@angular/core';
import { ContentfullService } from '../modules/contentfull/services/contentfull.service';

@Injectable()
export class CVService {
	private readonly contentfullService = inject(ContentfullService);

	readonly resourceState = this.contentfullService.resourceState;

	readonly jobs = this.contentfullService.jobs;
	readonly skills = this.contentfullService.skills;
}
