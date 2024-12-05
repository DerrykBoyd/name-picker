<script lang="ts">
	import { Clock, Trophy } from 'lucide-svelte';
	import { allParticipants, allResults } from './shared.svelte';
	import { formatDistanceToNow } from 'date-fns';

	let scores = $derived.by(() => {
		const scores = new Map<
			string,
			{
				total: number;
				dates: number[];
			}
		>();
		allResults.filtered.forEach((result) => {
			const winner = allParticipants.includingDeleted.find((p) => p._id.includes(result.winner));
			if (winner) {
				scores.set(winner._id, {
					total: (scores.get(winner._id)?.total || 0) + 1,
					dates: [...(scores.get(winner._id)?.dates || []), result.created_at]
				});
			}
		});
		return Array.from(scores.entries()).sort((a, b) => b[1].total - a[1].total);
	});
</script>

<h2 class="flex items-center gap-4 text-lg font-semibold">
	<Trophy class="text-yellow-700 dark:text-yellow-400" /> Scoreboard
</h2>
<ul class="grid gap-3 md:grid-cols-2">
	{#each scores as [id, score]}
		{@const participant = allParticipants.includingDeleted.find((p) => p._id === id)}
		{@const lastWin = new Date(Math.max(...score.dates))}
		<li class="flex w-full items-center gap-2 rounded-lg bg-card p-3">
			<div class="flex-1">
				<span>{participant?.name || id}</span>
				<span class="ml-2 opacity-50">{score.total} win{score.total > 1 ? 's' : ''}</span>
			</div>
			<span class="flex items-center gap-1 text-sm opacity-50"
				><Clock size={16} />{formatDistanceToNow(lastWin, {
					addSuffix: true
				})}</span
			>
		</li>
	{/each}
</ul>
