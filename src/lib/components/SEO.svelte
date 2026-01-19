<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';

	interface Props {
		title?: string;
		description?: string;
		canonical?: string;
		image?: string;
		type?: 'website' | 'article';
		siteUrl?: string;
		projects?: Project[];
		keywords?: string;
	}

	let {
		title = 'Uģis Traumanis | Latvian Sculptor & Metal Artist',
		description = 'Portfolio of Uģis Traumanis, Latvian sculptor and metal artist specializing in steel sculptures since 1992. Exhibited internationally in Latvia, Germany, France, Belgium, Finland, and the Netherlands.',
		canonical,
		image,
		type = 'website',
		siteUrl = 'https://ugistraumanis.com',
		projects = [],
		keywords = 'Uģis Traumanis, Latvian sculptor, metal art, steel sculpture, contemporary sculpture, metal artist Latvia, skulptūra, tēlnieks, metāla māksla'
	}: Props = $props();

	// Build full canonical URL
	const fullCanonical = $derived(canonical ? `${siteUrl}${canonical}` : siteUrl);

	// Build full image URL
	const fullImage = $derived(
		image ??
			`https://res.cloudinary.com/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1200,h_630,c_fill,g_auto,f_auto,q_auto/onlyonly-studio/59DU3026`
	);

	// JSON-LD structured data for Person (Artist)
	const personSchema = $derived({
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
		email: 'traumanis@gmail.com',
		telephone: '+371 26181546',
		sameAs: [
			'https://www.instagram.com/ugis_traumanis'
			// Add more social profiles as they become available
		]
	});

	// Organization/Studio schema for local business SEO
	const organizationSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Uģis Traumanis Studio',
		url: siteUrl,
		logo: fullImage,
		founder: {
			'@type': 'Person',
			name: 'Uģis Traumanis'
		},
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'traumanis@gmail.com',
			telephone: '+371 26181546',
			contactType: 'customer service',
			availableLanguage: ['Latvian', 'English']
		},
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'LV'
		}
	});

	// ImageGallery schema for the portfolio
	const gallerySchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: 'Uģis Traumanis Portfolio',
		description: 'Collection of steel and metal sculptures by Latvian artist Uģis Traumanis',
		url: siteUrl,
		author: {
			'@type': 'Person',
			name: 'Uģis Traumanis'
		}
	});

	// Generate VisualArtwork schema for each project
	const artworkSchemas = $derived(
		projects.map((project) => ({
			'@context': 'https://schema.org',
			'@type': 'VisualArtwork',
			name: project.title,
			dateCreated: project.year,
			artMedium: 'Steel, Metal',
			artform: 'Sculpture',
			creator: {
				'@type': 'Person',
				name: 'Uģis Traumanis'
			},
			image: project.images[0]?.publicId
				? `https://res.cloudinary.com/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_800,f_auto,q_auto/${project.images[0].publicId}`
				: undefined
		}))
	);

	// Combine all schemas into a single array for JSON-LD
	const allSchemas = $derived([personSchema, organizationSchema, gallerySchema, ...artworkSchemas]);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href={fullCanonical} />

	<!-- hreflang for multilingual SEO -->
	<link rel="alternate" hreflang="lv" href={siteUrl} />
	<link rel="alternate" hreflang="x-default" href={siteUrl} />

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
	{@html `<script type="application/ld+json">${JSON.stringify(allSchemas)}</script>`}
</svelte:head>
