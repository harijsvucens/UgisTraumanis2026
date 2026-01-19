<script lang="ts">
	import Intro from '$lib/components/Intro.svelte';
	import ProjectBlock from '$lib/components/ProjectBlock.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Screensaver from '$lib/components/Screensaver.svelte';

	let { data } = $props();
</script>

<SEO
	title="Kontakti | Uģis Traumanis"
	description="Sazinies ar Uģi Traumani - Latvijas tēlnieku un metālmākslinieku. E-pasts un tālrunis pasūtījumiem un sadarbībai."
	canonical="/kontakti"
	keywords="Uģis Traumanis kontakti, contact sculptor Latvia, pasūtīt skulptūru, commission sculpture"
	projects={data.projects}
/>

<main class="p-2">
	<Screensaver projects={data.projects} />
	<Intro
		exhibitions={data.exhibitions}
		bio={data.profile.bio}
		contacts={data.profile.contacts}
		initialTab="kontakti"
	/>
	{#each data.projects as project}
		<ProjectBlock {project} />
	{/each}
</main>
