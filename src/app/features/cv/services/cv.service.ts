import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { SkillsService } from '@feat/skills/services/skills.service';
import { combineLatest, firstValueFrom, shareReplay } from 'rxjs';
import type { Job } from '../types/job.type';

// type Formation = {
// 	degree: string;
// 	school: string;
// 	city: string;
// 	startDate: string;
// 	endDate?: Date;
// 	description: string;
// };

@Injectable()
export class CVService {
	readonly cvResource = resource({
		loader: () =>
			firstValueFrom(
				combineLatest([this.skillsService.skills$, this.jobs$]).pipe(
					shareReplay(1)
				)
			),
	});

	private readonly httpClient = inject(HttpClient);
	private readonly skillsService = inject(SkillsService);

	private readonly jobs$ = this.httpClient.get<Job[]>('/json/jobs.json');
}
