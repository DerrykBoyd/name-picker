<script lang="ts">
	import Result from './result.svelte';

	import { allParticipants, allResults } from './shared.svelte';
</script>

<h2 class="text-lg font-semibold">Results</h2>
<ul class="grid gap-3 md:grid-cols-2">
	{#each allResults.filtered as result}
		{@const winner = allParticipants.includingDeleted.find((p) => p._id.includes(result.winner))}
		<Result {result} name={winner?.name || result.winner} />
	{/each}
</ul>
