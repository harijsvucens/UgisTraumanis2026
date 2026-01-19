import type { ProjectImage } from '$lib/data/projects';
import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';

// Track preloaded images to avoid duplicate requests
const preloadedImages = new Set<string>();

function getHighResUrl(publicId: string): string {
	return `https://res.cloudinary.com/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,c_fit,w_1600/${publicId}`;
}

class LightboxState {
	isOpen = $state(false);
	images = $state<ProjectImage[]>([]);
	currentIndex = $state(0);

	get currentImage() {
		return this.images[this.currentIndex];
	}

	// Preload high-res image on hover for instant display
	preload(publicId: string) {
		if (preloadedImages.has(publicId)) return;
		preloadedImages.add(publicId);

		const img = new Image();
		img.src = getHighResUrl(publicId);
	}

	open(images: ProjectImage[], index: number = 0) {
		this.images = images;
		this.currentIndex = index;
		this.isOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	close() {
		this.isOpen = false;
		this.images = [];
		this.currentIndex = 0;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	next() {
		if (this.images.length === 0) return;
		this.currentIndex = (this.currentIndex + 1) % this.images.length;
	}

	prev() {
		if (this.images.length === 0) return;
		this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
	}
}

export const lightbox = new LightboxState();
