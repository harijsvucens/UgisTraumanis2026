import type { Project } from '$lib/data/projects';
import exhibitionsData from '$lib/data/exhibitions.json';
import profileData from '$lib/data/profile.json';

// Interface for the raw project data (how it looks in the JSON file now)
interface RawProject {
	id: string;
	title: string;
	year: string;
	sortOrder?: number;
	images: {
		assetId: string; // This references the Asset collection
		layout: 'landscape' | 'portrait' | 'narrow';
	}[];
}

// Interface for the Asset data
interface Asset {
	id: string;
	title: string;
	publicId: string;
	alt: string;
}

export async function load() {
	// 1. Load all Assets
	const assetFiles = import.meta.glob<{ default: Asset }>('/src/lib/data/assets/*.json', {
		eager: true
	});

	// Create a lookup map for assets:  id -> Asset
	const assetMap = new Map<string, Asset>();
	Object.values(assetFiles).forEach((mod) => {
		const asset = mod.default;
		if (asset.id) assetMap.set(asset.id, asset);
	});

	// 2. Load all Projects
	const projectFiles = import.meta.glob<{ default: RawProject }>('/src/lib/data/projects/*.json', {
		eager: true
	});

	// 3. Process projects and hydrate images
	const projects: Project[] = Object.values(projectFiles)
		.map((module) => {
			const raw = module.default;

			// Transform the raw "assetId" into the full "ProjectImage" structure
			const hydratedImages =
				raw.images?.map((img) => {
					const asset = assetMap.get(img.assetId);
					// Build descriptive alt: prefer asset alt, fallback to "Project Title (Year)"
					const altText = asset?.alt || `${raw.title || 'Sculpture'} (${raw.year || 'artwork'})`;
					return {
						publicId: asset?.publicId || '', // Fallback if asset not found
						alt: altText,
						layout: img.layout || 'landscape'
					};
				}) || [];

			return {
				id: raw.id,
				title: raw.title,
				year: raw.year,
				sortOrder: raw.sortOrder ?? 0,
				images: hydratedImages
			};
		})
		.sort((a, b) => {
			// Sort by sortOrder descending (highest first)
			const sortDiff = (b.sortOrder ?? 0) - (a.sortOrder ?? 0);
			if (sortDiff !== 0) return sortDiff;
			// Fallback to ID sorting if sortOrder is the same
			const numA = parseInt(a.id.replace('project-', '') || '0');
			const numB = parseInt(b.id.replace('project-', '') || '0');
			return numA - numB;
		});

	return { projects, exhibitions: exhibitionsData.exhibitions, profile: profileData };
}
