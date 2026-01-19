import type { RequestHandler } from './$types';

const SITE_URL = 'https://ugistraumanis.com';

export const GET: RequestHandler = async () => {
	const pages = [
		{
			url: '',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'monthly',
			priority: '1.0'
		},
		{
			url: '/izstades',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'monthly',
			priority: '0.8'
		},
		{
			url: '/kontakti',
			lastmod: new Date().toISOString().split('T')[0],
			changefreq: 'yearly',
			priority: '0.7'
		}
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
