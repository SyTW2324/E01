import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['clover']
		},
		include: ['tests/**/*.{test,spec}.{js,ts}']
	}
});
