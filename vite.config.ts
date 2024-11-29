import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: { proxy: {} },
	define: { global: 'window' },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
