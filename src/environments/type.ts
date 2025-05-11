export type AppEnvironment = {
	production: boolean;
	contentful: {
		space: string;
		accessToken: string;
	};
};
