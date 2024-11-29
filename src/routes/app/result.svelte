<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Result as TResult } from '$lib/pouch-db/schema';
	import { cn } from '$lib/utils';
	import { Clock, Trash2 } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { pouchDB } from './shared.svelte';

	type Props = { result: TResult; name: string };
	let { result, name }: Props = $props();

	// accountants don't use erasers
	function deleteResult() {
		const { _id, _rev, ...rest } = result;
		const parts = _id.split('|');
		parts[parts.length - 1] = `${Date.now()}`;
		$pouchDB?.put({
			_id: parts.join('|'),
			...rest,
			deleted: true
		});
	}
</script>

<li class="relative flex rounded-lg bg-card" transition:fade>
	<Button
		class="absolute -right-1 -top-1 z-10 h-7 w-7 rounded-full p-1"
		variant="destructive"
		onclick={deleteResult}><Trash2 size={14} /></Button
	>
	<span
		class={cn(
			'w-full min-w-20 rounded-lg bg-card px-8 py-3 transition-opacity',
			'flex items-center gap-2 hover:bg-card/80'
		)}
	>
		<span class="flex-1">{name}</span>
		<span class="flex items-center gap-2 text-sm opacity-60">
			<Clock size={16} />
			{new Date(result.created_at).toLocaleDateString()}
		</span>
	</span>
</li>
