import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
} from '@angular/core';

import { RichTextComponent } from '@feat/contentful/components/rich-text.component';
import { ButtonComponent, Card } from '@shared/components';

import type { Project } from '../../types/project.type';
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { ProjectTopicPillComponent } from '../project-topic/project-topic.component';

@Component({
	selector: 'app-project-card',
	host: { class: 'max-w-lg' },
	template: `
		<app-card>
			<header class="-mt-3 -mx-3 sm:-mx-6" heading>
				@if (project().assets?.[0]?.file?.url; as projectBannerUrl) {
					<img
						class="w-full h-auto max-h-52 object-cover rounded-t-xl"
						id="banner"
						alt="Project Banner"
						[src]="projectBannerUrl" />
				}

				<div
					class="flex gap-2 items-center justify-between px-3  py-2 !pb-0"
					subHeader>
					<h3 class="font-semibold text-3xl text-primary-900 ">
						{{ project().name }}
					</h3>
					<app-project-status [status]="project().status" />
				</div>
			</header>

			<app-rich-text [content]="project().description" />

			@if (this.project().repo; as gitRepo) {
				<div class="flex flex-wrap gap-1">
					@for (topic of gitRepo.topics; track $index) {
						<app-project-topic-pill [topic]="topic" />
					}
				</div>

				<div class="flex flex-wrap gap-1 mt-2">
					<a
						app-button
						appearance="stroked"
						href="{{ gitRepo.html_url }}"
						rel="noopener noreferrer"
						target="_blank">
						Code source
					</a>

					<a
						app-button
						href="{{ gitRepo.homepage }}"
						rel="noopener noreferrer"
						target="_blank">
						Voir le site
					</a>
				</div>
			}
		</app-card>
	`,
	imports: [
		Card,
		RichTextComponent,
		ProjectTopicPillComponent,
		ProjectStatusComponent,
		ButtonComponent,
	],
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
