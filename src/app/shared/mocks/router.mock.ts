export const mockRouter = {
	navigate: jasmine
		.createSpy('navigate')
		.and.returnValue(Promise.resolve(true)),
};
