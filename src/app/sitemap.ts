import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${baseUrl}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	];
}
