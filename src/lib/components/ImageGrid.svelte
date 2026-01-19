<script lang="ts">
	import CloudinaryImage from './CloudinaryImage.svelte';
	import type { ProjectImage } from '$lib/data/projects';
	import { lightbox } from '$lib/stores/lightbox.svelte';

	let { images }: { images: ProjectImage[] } = $props();

	// Check if on mobile (lightbox disabled on mobile)
	const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

	// Only open lightbox on desktop
	const handleImageClick = (index: number) => {
		if (!isMobile()) {
			lightbox.open(images, index);
		}
	};

	// Get aspect ratio based on image layout (all share same height, width varies)
	const getAspectClass = (layout: ProjectImage['layout']) => {
		switch (layout) {
			case 'landscape':
				return 'aspect-[3/2]'; // wider than tall
			case 'narrow':
				return 'aspect-[2/3]'; // narrower portrait
			case 'portrait':
			default:
				return 'aspect-[4/5]'; // standard portrait
		}
	};
</script>

<div class="image-grid">
	{#each images as image, index}
		<div
			class="image-item"
			class:cursor-pointer={true}
			role="img"
			aria-label={image.alt}
			onclick={() => handleImageClick(index)}
			onkeydown={(e) => e.key === 'Enter' && handleImageClick(index)}
			onmouseenter={() => !isMobile() && lightbox.preload(image.publicId)}
			tabindex="-1"
		>
			<CloudinaryImage
				publicId={image.publicId}
				alt={image.alt}
				sizes="(min-width: 768px) 33vw, 100vw"
				class="{getAspectClass(image.layout)} h-full w-auto max-w-full object-cover"
			/>
		</div>
	{/each}
</div>

<style>
	.image-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem;
		user-select: none;
	}

	.image-item {
		height: 350px; /* Fixed height for all images */
		flex-shrink: 0;
		user-select: none;
		-webkit-user-select: none;
		outline: none;
	}

	.image-item :global(img) {
		user-select: none;
		-webkit-user-select: none;
		-webkit-user-drag: none;
		pointer-events: none;
	}

	@media (max-width: 640px) {
		.image-item {
			height: auto;
			width: 100%;
			cursor: default;
		}

		.image-item :global(.image-container) {
			width: 100%;
			height: auto;
		}

		.image-item :global(img) {
			width: 100%;
			height: auto;
			aspect-ratio: auto;
		}
	}
</style>
