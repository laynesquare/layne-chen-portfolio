import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Layne Chen | Front-end Developer',
		short_name: 'Layne Chen',
		description:
			'Proficient in TypeScript/JavaScript, React, Angular, Node.js, and MongoDB. Skilled in SSG/SSR, RESTful APIs, and UX design, with a focus on performance and aesthetics.',
		start_url: '/',
		display: 'standalone',
		background_color: '#1a1a1a',
		theme_color: '#1a1a1a',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '256x256',
				type: 'image/x-icon',
			},
			{
				src: '/icon1.png',
				sizes: '32x32',
				type: 'image/png',
			},
			{
				src: '/icon2.png',
				sizes: '16x16',
				type: 'image/png',
			},
			{
				src: '/meta/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/meta/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/meta/safari-pinned-tab.svg',
				sizes: 'any',
				type: 'image/svg+xml',
				purpose: 'maskable',
			},
		],
	};
}
