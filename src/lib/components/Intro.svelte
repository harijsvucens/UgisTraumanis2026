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

	<div class="mb-4 flex gap-4" role="tablist" aria-label="Profila sadaļas">
		{#each tabs as tab}
			<button
				class="tab-button uppercase transition-colors duration-200 hover:text-black/40"
				class:active={activeTab === tab.id}
				onclick={() => (activeTab = tab.id)}
				role="tab"
				id="tab-{tab.id}"
				aria-selected={activeTab === tab.id}
				aria-controls="panel-{tab.id}"
				tabindex={activeTab === tab.id ? 0 : -1}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Keep all content in DOM for SEO, use CSS to show/hide -->
	<div class="space-y-1">
		<div
			id="panel-bio"
			role="tabpanel"
			aria-labelledby="tab-bio"
			class="tab-panel"
			class:active={activeTab === 'bio'}
			hidden={activeTab !== 'bio'}
		>
			<p class="max-w-prose whitespace-pre-line">{bio}</p>
		</div>

		<div
			id="panel-izstades"
			role="tabpanel"
			aria-labelledby="tab-izstades"
			class="tab-panel"
			class:active={activeTab === 'izstades'}
			hidden={activeTab !== 'izstades'}
		>
			<h2 class="sr-only">Izstādes</h2>
			{#each exhibitions as exhibition}
				<div class="cursor-default transition-colors duration-200 hover:text-black/40">
					<span class="mr-4 inline-block w-12">{exhibition.year}</span>
					<span>{exhibition.description}</span>
				</div>
			{/each}
		</div>

		<div
			id="panel-kontakti"
			role="tabpanel"
			aria-labelledby="tab-kontakti"
			class="tab-panel"
			class:active={activeTab === 'kontakti'}
			hidden={activeTab !== 'kontakti'}
		>
			<h2 class="sr-only">Kontakti</h2>
			<p class="whitespace-pre-line">{contacts}</p>
		</div>
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

	/* Screen reader only - for hidden headings */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
