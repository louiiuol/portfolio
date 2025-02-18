import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay } from 'rxjs';
import type { Skill } from '../types/skill.type';

@Injectable()
export class SkillsService {
	private readonly httpClient = inject(HttpClient);

	readonly skills$ = this.httpClient
		.get<Skill[]>('/json/skills.json')
		.pipe(delay(1000));
}
