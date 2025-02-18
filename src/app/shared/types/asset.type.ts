export type Asset = {
	name: string;
	description: string;
	type: 'image' | 'video' | 'link';
	mediaPath?: string;
	externalLink?: string;
};
