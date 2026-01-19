export interface ProjectImage {
	publicId: string; // The cleaned filename for Cloudinary
	alt: string;
	layout: 'landscape' | 'portrait' | 'narrow'; // For CSS container styling
}

export interface Project {
	id: string;
	title: string;
	year: string;
	images: ProjectImage[];
}
