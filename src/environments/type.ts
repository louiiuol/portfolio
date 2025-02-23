export type AppEnvironment = {
	production: boolean;
	contenftull: {
		space: string;
		accessToken: string;
		contentTypeIds: {
			[key: string]: string;
		};
	};
};
