<script lang="ts">
	import CloudinaryImage from './CloudinaryImage.svelte';
	import type { ProjectImage } from '$lib/data/projects';
	import { lightbox } from '$lib/stores/lightbox.svelte';

	let { images }: { images: ProjectImage[] } = $props();

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
		<button
			class="image-item cursor-pointer transition-opacity hover:opacity-90"
			onclick={() => lightbox.open(images, index)}
			aria-label="View {image.alt} in lightbox"
		>
			<CloudinaryImage
				publicId={image.publicId}
				alt={image.alt}
				sizes="(min-width: 768px) 33vw, 100vw"
				class="{getAspectClass(image.layout)} h-full w-auto max-w-full object-cover"
			/>
		</button>
	{/each}
</div>

<style>
	.image-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem;
	}

	.image-item {
		height: 350px; /* Fixed height for all images */
		flex-shrink: 0;
	}

	@media (max-width: 640px) {
		.image-item {
			height: auto;
			width: 100%;
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
