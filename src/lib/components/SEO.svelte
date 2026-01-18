<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		canonical?: string;
		image?: string;
		type?: 'website' | 'article';
		siteUrl?: string;
	}

	let {
		title = 'Uģis Traumanis | Latvian Sculptor & Metal Artist',
		description = 'Portfolio of Uģis Traumanis, Latvian sculptor and metal artist specializing in steel sculptures since 1992. Exhibited internationally in Latvia, Germany, France, Belgium, Finland, and the Netherlands.',
		canonical,
		image,
		type = 'website',
		siteUrl = 'https://ugistraumanis.com'
	}: Props = $props();

	// Build full canonical URL
	const fullCanonical = $derived(canonical ? `${siteUrl}${canonical}` : siteUrl);

	// Build full image URL
	const fullImage = $derived(
		image ??
			`https://res.cloudinary.com/dowxhswap/image/upload/w_1200,h_630,c_fill,g_auto,f_auto,q_auto/onlyonly-studio/59DU3026`
	);

	// JSON-LD structured data for Person (Artist)
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Uģis Traumanis',
		jobTitle: 'Sculptor',
		description: 'Latvian sculptor and metal artist specializing in steel and metal sculptures.',
		nationality: {
			'@type': 'Country',
			name: 'Latvia'
		},
		knowsAbout: ['Sculpture', 'Metal Art', 'Steel Sculpture', 'Contemporary Art'],
		alumniOf: {
			'@type': 'EducationalOrganization',
			name: 'Latvijas Mākslas akadēmija'
		},
		url: siteUrl,
		image: fullImage,
		sameAs: []
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<link rel="canonical" href={fullCanonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullCanonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:locale" content="lv_LV" />
	<meta property="og:site_name" content="Uģis Traumanis" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={fullCanonical} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
