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
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { ProjectTopicPillComponent } from '../project-topic/project-topic.component';

@Component({
	selector: 'app-project-card',
	host: { class: 'max-w-5xl' },
	template: `
		<app-card>
			<header class="-mt-3 -mx-3 sm:-mx-6 relative" heading>
				<app-project-status
					class="absolute top-2 right-2"
					[status]="project().status" />
				@if (project().assets?.[0]?.file?.url; as projectBannerUrl) {
					<img
						class="w-full h-auto max-h-52 object-cover rounded-t-xl"
						id="banner"
						alt="Project Banner"
						[src]="projectBannerUrl" />
				}
				<div class="flex gap-2 items-center justify-start">
					<h3
						class="font-semibold text-3xl px-3 py-2 text-primary-900 !pb-0"
						subHeader>
						{{ project().name }}
					</h3>
				</div>
			</header>

			<app-rich-text [content]="project().description" />

			@if (this.project().repo; as gitRepo) {
				<div class="flex flex-wrap gap-1">
					@for (topic of gitRepo.topics; track $index) {
						<app-project-topic-pill [topic]="topic" />
					}
				</div>

				<p>Liens</p>
				<ul class="list-disc list-inside">
					<li>
						<a
							href="{{ gitRepo.html_url }}"
							rel="noopener noreferrer"
							target="_blank">
							Code source
						</a>
					</li>
					@if (gitRepo.homepage) {
						<li>
							<a
								href="{{ gitRepo.homepage }}"
								rel="noopener noreferrer"
								target="_blank">
								Page d'accueil
							</a>
						</li>
					}
				</ul>
			}
		</app-card>
	`,
	imports: [
		Card,
		RichTextComponent,
		ProjectTopicPillComponent,
		ProjectStatusComponent,
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
