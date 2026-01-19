<script lang="ts">
	import ImageGrid from './ImageGrid.svelte';
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<section class="mb-16">
	<ImageGrid images={project.images} />
	<div class="group mt-2">
		<span class="mr-4 inline-block w-12">{project.year}</span>
		<h2 class="inline opacity-0 transition-opacity duration-200 group-hover:opacity-100">
			{project.title}
		</h2>
	</div>
</section>
