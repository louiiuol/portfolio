import { inject, Injectable } from '@angular/core';
import { ContentfullService } from '@feat/contentfull/services/contentfull.service';

@Injectable()
export class SkillService {
	private readonly contentfullService = inject(ContentfullService);

	readonly skills = this.contentfullService.skills;
}
