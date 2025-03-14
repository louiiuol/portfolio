import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

// source: https://primeng.org/theming#primary
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const PrimeCustomPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '#dde1ff',
			100: '#b8c3ff',
			200: '#99a7ee',
			300: '#7f8dd2',
			400: '#6573b6',
			500: '#4c5a9b',
			600: '#404e8e',
			700: '#344282',
			800: '#283675',
			900: '#1b2b6a',
			950: '#001355',
		},
	},
});
