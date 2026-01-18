<script lang="ts">
	interface Props {
		exhibitions: { year: string; description: string }[];
	}

	let { exhibitions }: Props = $props();
</script>

<div class="mb-16 max-w-prose lg:max-w-none">
	<h1 class="mb-8 uppercase">UĢIS TRAUMANIS</h1>

	<div class="space-y-1">
		<p class="mb-4">IZSTĀDES:</p>

		{#each exhibitions as exhibition}
			<div class="cursor-default transition-colors duration-200 hover:text-black/40">
				<span class="mr-4 inline-block w-12">{exhibition.year}</span>
				<span>{exhibition.description}</span>
			</div>
		{/each}
	</div>
</div>
