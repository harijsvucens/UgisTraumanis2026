<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Lightbox from '$lib/components/Lightbox.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Lightbox />
{@render children()}
