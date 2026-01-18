<script lang="ts">
	import ImageGrid from './ImageGrid.svelte';
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<section class="mb-16">
	<ImageGrid images={project.images} />
	<div class="mt-4 text-sm text-gray-600">
		<h2 class="inline font-bold uppercase">{project.title}</h2>
		<span class="ml-2">{project.year}</span>
	</div>
</section>
