import path from 'path';
//import fs from 'fs';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
//import dotenv from 'dotenv';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { NodePackageImporter } from 'sass-embedded';
import manifestSRI from 'vite-plugin-manifest-sri';

function getAllowedOrigins(env: Record<string, string>) {
	const origins: string[] = [];
	const devUrl = env.VITE_DEV_URL || 'http://localhost';
	const appPort = env.VITE_APP_PORT || '8000';
	const devPort = env.VITE_DEV_PORT || '5179';
	const hostname = new URL(devUrl).hostname;

	// Laravel backend
	origins.push(`${devUrl}:${appPort}`);
	if (hostname === 'localhost') {
		origins.push(`http://127.0.0.1:${appPort}`);
	}

	// Vite dev server
	origins.push(`${devUrl}:${devPort}`);
	if (hostname === 'localhost') {
		origins.push(`http://127.0.0.1:${devPort}`);
	}

	return origins;
}

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const allowedOrigins = getAllowedOrigins(env);
	const wsProtocol = env.VITE_DEV_URL?.startsWith('https') ? 'wss' : 'ws';
	const wsHost = new URL(env.VITE_DEV_URL || 'http://localhost').hostname;

	return {
		plugins: [
			laravel({
				input: ['resources/js/app.tsx'],
				ssr: 'resources/js/ssr.tsx',
				refresh: true,
			}),
			react(),
			tailwindcss(),
			manifestSRI(),
		],
		server: {
			host: '0.0.0.0', // يسمح بالوصول من LAN
			port: Number(env.VITE_DEV_PORT || 5179),
			strictPort: true,
			cors: {
				origin: allowedOrigins,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
				allowedHeaders: ['Content-Type', 'Authorization'],
				credentials: true,
			},
			hmr: {
				protocol: wsProtocol,
				host: wsHost,
				port: Number(env.VITE_DEV_PORT || 5179),
			},
		},
		css: {
			postcss: './postcss.config.js',
			devSourcemap: true,



			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					silenceDeprecations: [
						'mixed-decls',
						'color-functions',
						'import',
						'global-builtin',
					],
					importers: [new NodePackageImporter()],
				},
			},
		},
		resolve: {
			alias: {
                '@fontsource-variable': path.resolve(
                    __dirname,
                    'node_modules/@fontsource-variable'
                ),
                'ziggy-js': path.resolve(__dirname, 'vendor/tightenco/ziggy'),


			},
		},
	};
});
