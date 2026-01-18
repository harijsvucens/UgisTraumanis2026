import type { ProjectImage } from '$lib/data/projects';

class LightboxState {
	isOpen = $state(false);
	images = $state<ProjectImage[]>([]);
	currentIndex = $state(0);

	get currentImage() {
		return this.images[this.currentIndex];
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
