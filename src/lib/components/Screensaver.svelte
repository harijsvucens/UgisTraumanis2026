<script lang="ts">
	import type { Project, ProjectImage } from '$lib/data/projects';
	import CloudinaryImage from './CloudinaryImage.svelte';
	import { fade } from 'svelte/transition';

	let { projects }: { projects: Project[] } = $props();

	let idleTime = 20000; // 20 seconds
	let active = $state(false);
	let images: ProjectImage[] = $state([]);
	let currentImageIndex = $state(0);
	let timer: ReturnType<typeof setTimeout>;
	let interval: ReturnType<typeof setInterval>;

	// Flatten and shuffle images
	function shuffle(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	$effect(() => {
		if (projects) {
			const allImages = projects
				.flatMap((p) => p.images)
				.filter((img) => !img.excludeFromScreensaver);
			images = shuffle([...allImages]);
		}
	});

	function resetTimer() {
		active = false;
		clearTimeout(timer);
		if (typeof window !== 'undefined') {
			timer = setTimeout(() => {
				// Only activate on desktop (width > 1024px)
				if (window.innerWidth > 1024) {
					active = true;
				}
			}, idleTime);
		}
	}

	function handleActivity() {
		if (active) {
			active = false;
		}
		resetTimer();
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
			events.forEach((event) => window.addEventListener(event, handleActivity));

			resetTimer();

			interval = setInterval(() => {
				if (active && images.length > 0) {
					currentImageIndex = (currentImageIndex + 1) % images.length;
				}
			}, 6000); // 6 seconds per slide

			return () => {
				events.forEach((event) => window.removeEventListener(event, handleActivity));
				clearTimeout(timer);
				clearInterval(interval);
			};
		}
	});

	let currentImage = $derived(images[currentImageIndex]);
</script>

{#if active && currentImage}
	<div class="fixed inset-0 z-40 bg-white" transition:fade={{ duration: 1000 }}>
		<h1 class="fixed top-2 left-2 z-50 mb-8 text-white uppercase mix-blend-difference">
			UĢIS TRAUMANIS
		</h1>
		{#key currentImageIndex}
			<div class="absolute inset-0" transition:fade={{ duration: 1000 }}>
				<CloudinaryImage
					publicId={currentImage.publicId}
					alt={currentImage.alt}
					width={1920}
					height={1080}
					mode="cover"
					class="h-full w-full object-cover"
				/>
			</div>
		{/key}
	</div>
{/if}
