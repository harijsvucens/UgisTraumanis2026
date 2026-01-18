import type { Project } from '$lib/data/projects';
import exhibitionsData from '$lib/data/exhibitions.json';

export async function load() {
	// Load all JSON files from the projects folder
	const projectFiles = import.meta.glob<{ default: Project }>('/src/lib/data/projects/*.json', {
		eager: true
	});

	// Extract project data and sort by id
	const projects: Project[] = Object.values(projectFiles)
		.map((module) => module.default)
		.sort((a, b) => {
			// Extract numeric part from id (e.g., "project-1" -> 1)
			const numA = parseInt(a.id.replace('project-', ''));
			const numB = parseInt(b.id.replace('project-', ''));
			return numA - numB;
		});

	return { projects, exhibitions: exhibitionsData.exhibitions };
}
