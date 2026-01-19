export interface ProjectImage {
	publicId: string; // The cleaned filename for Cloudinary
	alt: string;
	layout: 'landscape' | 'portrait' | 'narrow'; // For CSS container styling
	excludeFromScreensaver?: boolean; // If true, this image won't appear in the screensaver
}

export interface Project {
	id: string;
	title: string;
	year: string;
	images: ProjectImage[];
}
