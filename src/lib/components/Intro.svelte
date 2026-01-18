<script lang="ts">
	interface Props {
		exhibitions: { year: string; description: string }[];
	}

	let { exhibitions }: Props = $props();
</script>

<div class="mb-16 max-w-prose">
	<h1 class="mb-8 text-2xl font-bold uppercase">UĢIS TRAUMANIS</h1>

	<div class="space-y-1 text-sm">
		<p class="mb-4 font-bold">IZSTĀDES:</p>

		{#each exhibitions as exhibition}
			<div>
				{exhibition.year}
				{exhibition.description}
			</div>
		{/each}
	</div>
</div>
