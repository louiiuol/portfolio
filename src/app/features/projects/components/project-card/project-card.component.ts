import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
} from '@angular/core';

import { RichTextComponent } from '@feat/contentful/components/rich-text.component';
import { Card } from '@shared/components';

import type { Project } from '../../types/project.type';
import { ProjectTopicPillComponent } from '../project-topic/project-topic.component';

@Component({
	selector: 'app-project-card',
	host: { class: '' },
	template: `
		<app-card>
			<h3>{{ project().name }}</h3>
			@if (project().assets?.[0]?.file?.url; as projectBannerUrl) {
				<img id="banner" alt="Project Banner" [src]="projectBannerUrl" />
			}
			<hr />
			<app-rich-text [content]="project().description" />

			@if (this.project().repo; as gitRepo) {
				<p>tags</p>
				<div class="flex flex-wrap gap-1">
					@for (topic of gitRepo.topics; track $index) {
						<app-project-topic-pill [topic]="topic" />
					}
				</div>
				<hr />
				<p>Liens</p>
				<ul class="list-disc list-inside">
					<li>
						<a
							href="{{ gitRepo.html_url }}"
							rel="noopener noreferrer"
							target="_blank">
							GitHub
						</a>
					</li>
				</ul>
			}
		</app-card>
	`,
	imports: [Card, RichTextComponent, ProjectTopicPillComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
	readonly project = input.required<Project>();

	logEffect = effect(() => {
		console.log('ProjectCard', this.project());
	});

	protected readonly projectBannerUrl = computed(
		() => this.project().assets?.[0]?.file?.url
	);
}
