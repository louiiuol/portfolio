export type Skill = {
	slug: string;
	name: string;
	description?: string;
	level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	icon: string;
};
