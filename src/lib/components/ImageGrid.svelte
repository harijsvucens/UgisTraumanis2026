<script lang="ts">
	import CloudinaryImage from './CloudinaryImage.svelte';
	import type { ProjectImage } from '$lib/data/projects';
	import { lightbox } from '$lib/stores/lightbox.svelte';

	let { images }: { images: ProjectImage[] } = $props();
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
	{#each images as image, index}
		<button
			class="cursor-pointer overflow-hidden rounded-sm transition-opacity hover:opacity-90"
			onclick={() => lightbox.open(images, index)}
			aria-label="View {image.alt} in lightbox"
		>
			<CloudinaryImage
				publicId={image.publicId}
				alt={image.alt}
				sizes="(min-width: 768px) 33vw, 100vw"
				class="aspect-[4/5] h-auto w-full object-cover"
			/>
		</button>
	{/each}
</div>
