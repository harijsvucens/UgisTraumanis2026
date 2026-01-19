<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import ProjectBlock from '$lib/components/ProjectBlock.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Screensaver from '$lib/components/Screensaver.svelte';

	let { data } = $props();
</script>

<SEO projects={data.projects} />

<main class="p-2">
	<Screensaver projects={data.projects} />
	<Intro exhibitions={data.exhibitions} bio={data.profile.bio} contacts={data.profile.contacts} />
	{#each data.projects as project}
		<ProjectBlock {project} />
	{/each}
</main>
