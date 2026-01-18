<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { lightbox } from '$lib/stores/lightbox.svelte';
	import CloudinaryImage from './CloudinaryImage.svelte';

	function handleKeydown(event: KeyboardEvent) {
		if (!lightbox.isOpen) return;

		switch (event.key) {
			case 'Escape':
				lightbox.close();
				break;
			case 'ArrowLeft':
				lightbox.prev();
				break;
			case 'ArrowRight':
				lightbox.next();
				break;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			lightbox.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if lightbox.isOpen && lightbox.currentImage}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-[#adadad]/90"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Image lightbox"
		tabindex="-1"
	>
		<!-- Close button -->
		<button
			class="absolute top-4 right-4 z-50 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
			onclick={() => lightbox.close()}
			aria-label="Close lightbox"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>

		<!-- Previous button -->
		{#if lightbox.images.length > 1}
			<button
				class="absolute left-4 z-50 rounded-full p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
				onclick={() => lightbox.prev()}
				aria-label="Previous image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
			</button>

			<!-- Next button -->
			<button
				class="absolute right-4 z-50 rounded-full p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
				onclick={() => lightbox.next()}
				aria-label="Next image"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</button>
		{/if}

		<!-- Image container -->
		<div
			class="relative flex h-[85vh] w-[85vw] items-center justify-center"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			{#key lightbox.currentIndex}
				<div
					class="absolute inset-0 flex items-center justify-center"
					in:fade={{ duration: 150 }}
					out:fade={{ duration: 150 }}
				>
					<CloudinaryImage
						publicId={lightbox.currentImage.publicId}
						alt={lightbox.currentImage.alt}
						width={1600}
						mode="contain"
						class="max-h-[85vh] max-w-[85vw]"
						priority
					/>
				</div>
			{/key}
		</div>

		<!-- Image counter -->
		{#if lightbox.images.length > 1}
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70">
				{lightbox.currentIndex + 1} / {lightbox.images.length}
			</div>
		{/if}
	</div>
{/if}
