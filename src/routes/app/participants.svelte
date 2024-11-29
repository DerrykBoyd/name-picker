<script lang="ts">
	import { ArrowDownAZ, ArrowDownZA } from 'lucide-svelte';
	import Participant from './participant.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { slide } from 'svelte/transition';
	import { allParticipants } from './shared.svelte';

	let order = $state<'asc' | 'desc'>('asc');

	let sorted = $derived.by(() => {
		return allParticipants.filtered.toSorted((a, b) => {
			if (order === 'asc') {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});
	});

	let total = $derived(allParticipants.filtered.length);
</script>

<div class="flex flex-wrap items-center gap-4 py-2">
	<h2 class="flex-1 text-lg font-semibold">Participants</h2>
	<span>{total} Total</span>
	<span>-</span>
	<span>{allParticipants.active.length} Active</span>
	<Button class="grid" size="icon" onclick={() => (order = order === 'asc' ? 'desc' : 'asc')}>
		{#if order === 'asc'}
			<span class="icon" transition:slide>
				<ArrowDownAZ />
			</span>
		{:else}
			<span class="icon" transition:slide>
				<ArrowDownZA />
			</span>
		{/if}
	</Button>
</div>
<ul class="grid gap-3 md:grid-cols-2">
	{#each sorted as participant}
		<Participant {participant} />
	{/each}
</ul>

<style>
	.icon {
		grid-area: 1/1/2/2;
	}
</style>
