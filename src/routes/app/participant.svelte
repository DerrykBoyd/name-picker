<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Participant } from '$lib/pouch-db/schema';
	import { cn } from '$lib/utils';
	import { Trash2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { pouchDB } from './shared.svelte';

	type Props = { participant: Participant };
	let { participant }: Props = $props();

	// accountants don't use erasers
	function toggleExcluded() {
		const { _id, _rev, ...rest } = participant;
		const parts = _id.split('|');
		parts[parts.length - 1] = `${Date.now()}`;
		$pouchDB?.put({
			_id: parts.join('|'),
			...rest,
			excluded: !participant.excluded
		});
	}

	function deleteParticipant() {
		const { _id, _rev, ...rest } = participant;
		const parts = _id.split('|');
		parts[parts.length - 1] = `${Date.now()}`;
		$pouchDB?.put({
			_id: parts.join('|'),
			...rest,
			deleted: true
		});
	}
</script>

<li class="relative" transition:fade>
	<Button
		class="absolute -right-1 -top-1 z-10 h-7 w-7 rounded-full p-1"
		variant="destructive"
		onclick={deleteParticipant}><Trash2 size={14} /></Button
	>
	<button
		onclick={toggleExcluded}
		class={cn(
			'w-full min-w-20 rounded-lg bg-card px-5 py-3 transition-opacity',
			'hover:bg-card/80',
			participant.excluded && 'opacity-30'
		)}
	>
		{participant.name}
	</button>
</li>
