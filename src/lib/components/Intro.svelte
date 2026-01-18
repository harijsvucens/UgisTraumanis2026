<script lang="ts">
	interface Props {
		exhibitions: { year: string; description: string }[];
		bio: string;
		contacts: string;
	}

	let { exhibitions, bio, contacts }: Props = $props();

	let activeTab = $state<'bio' | 'izstades' | 'kontakti'>('bio');

	const tabs = [
		{ id: 'bio', label: 'BIO' },
		{ id: 'izstades', label: 'IZSTĀDES' },
		{ id: 'kontakti', label: 'KONTAKTI' }
	] as const;
</script>

<div class="mb-16 max-w-prose lg:max-w-none">
	<h1 class="mb-8 uppercase">UĢIS TRAUMANIS</h1>

	<nav class="mb-4 flex gap-4">
		{#each tabs as tab}
			<button
				class="tab-button uppercase transition-colors duration-200 hover:text-black/40"
				class:active={activeTab === tab.id}
				onclick={() => (activeTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</nav>

	<div class="space-y-1">
		{#if activeTab === 'bio'}
			<p class="max-w-prose whitespace-pre-line">{bio}</p>
		{:else if activeTab === 'izstades'}
			{#each exhibitions as exhibition}
				<div class="cursor-default transition-colors duration-200 hover:text-black/40">
					<span class="mr-4 inline-block w-12">{exhibition.year}</span>
					<span>{exhibition.description}</span>
				</div>
			{/each}
		{:else if activeTab === 'kontakti'}
			<p class="whitespace-pre-line">{contacts}</p>
		{/if}
	</div>
</div>

<style>
	.tab-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font: inherit;
	}
</style>
