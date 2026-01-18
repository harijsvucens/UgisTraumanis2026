<script lang="ts">
	import { buildUrl } from 'cloudinary-build-url';
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';

	let {
		publicId,
		alt = '',
		width,
		height,
		sizes = '100vw',
		priority = false,
		srcsetWidths,
		quality = 'auto',
		class: userClass,
		...rest
	}: {
		publicId: string;
		alt?: string;
		width?: number | string;
		height?: number | string;
		sizes?: string;
		priority?: boolean;
		srcsetWidths?: number[];
		quality?: string | number;
		class?: string;
		[key: string]: any;
	} = $props();

	let loaded = $state(false);
	let error = $state(false);
	let imageElement = $state<HTMLImageElement>();

	$effect(() => {
		// handle cached images that load before hydration
		if (imageElement && imageElement.complete) {
			loaded = true;
		}
	});

	// Handle image load error
	function handleImageError() {
		error = true;
		console.error('[CloudinaryImage] Failed to load image:', publicId);
	}

	const getUrl = (w: number | null) => {
		const transformations: any = {
			quality: quality,
			fetchFormat: 'auto',
			gravity: 'auto',
			crop: 'fill'
		};

		if (w) {
			transformations.width = w;
		}

		return buildUrl(publicId, {
			cloud: { cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME },
			transformations
		});
	};

	// Smart srcset width calculation:
	// 1. If srcsetWidths is explicitly provided, use it
	// 2. If width is a number (fixed size), generate 1x and 2x widths
	// 3. Otherwise, use default responsive widths
	const finalSrcsetWidths = $derived.by(() => {
		if (srcsetWidths) return srcsetWidths;
		if (typeof width === 'number') return [width, width * 2];
		return [400, 800, 1200];
	});

	const srcset = $derived(finalSrcsetWidths.map((w) => `${getUrl(w)} ${w}w`).join(', '));
	const fallbackSrc = $derived(getUrl(finalSrcsetWidths[0]));
</script>

<div {...rest} class={['image-container', userClass]} class:error class:loaded>
	{#if !error}
		<img
			bind:this={imageElement}
			class="image"
			class:loaded
			src={fallbackSrc}
			{srcset}
			{sizes}
			{alt}
			{width}
			{height}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding={priority ? 'sync' : 'async'}
			onload={() => {
				loaded = true;
			}}
			onerror={handleImageError}
		/>
	{:else}
		<div class="error-message" role="alert">
			<svg
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="8" x2="12" y2="12"></line>
				<line x1="12" y1="16" x2="12.01" y2="16"></line>
			</svg>
			<p>Failed to load image</p>
		</div>
	{/if}
</div>

<style>
	.image-container {
		display: block;
		position: relative;
		width: 100%;
		overflow: hidden;
		background-color: #f0f0f0; /* Simple skeleton background */
		transition: background-color 0.5s ease;
	}

	.image {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
		opacity: 0;
		transition: opacity 400ms ease-in-out;
	}

	.image.loaded {
		opacity: 1;
	}

	/* Eager images should be visible immediately */
	.image[loading='eager'] {
		opacity: 1;
	}

	.image-container.error {
		background-color: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200px;
	}

	.image-container.loaded {
		background-color: transparent;
	}

	.error-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: #666;
		padding: 2rem;
		text-align: center;
	}

	.error-message svg {
		color: #999;
	}

	.error-message p {
		margin: 0;
		font-size: 0.875rem;
	}
</style>
