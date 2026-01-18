<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import ProjectBlock from '$lib/components/ProjectBlock.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();
</script>

<SEO />

<main class="mx-auto max-w-screen-xl p-4">
	<Intro />
	{#each data.projects as project}
		<ProjectBlock {project} />
	{/each}
</main>
