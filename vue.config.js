module.exports = {
	css: {
		loaderOptions: {
			sass: {
				//* Injects variables.scss into every .vue files
				additionalData: `@import "@/assets/styles/variables.scss";`
			}
		}
	}
};
