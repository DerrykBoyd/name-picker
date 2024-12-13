<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Participant as ParticipantType, Result } from '$lib/pouch-db/schema';
	import { cn } from '$lib/utils';
	import { wait } from '$lib/utils/wait';
	import { Shuffle } from 'lucide-svelte';
	import { nanoid } from 'nanoid';
	import { allParticipants, pouchDB } from './shared.svelte';
	import { Confetti } from 'svelte-confetti';
	import { tick } from 'svelte';

	let timing = $state<'instant' | 'suspense'>('instant');
	let winner = $state<ParticipantType | null>(null);
	let isPicking = $state(false);
	let showConfetti = $state(false);

	async function pick() {
		isPicking = true;
		if (timing === 'instant') {
			winner = allParticipants.active[Math.floor(Math.random() * allParticipants.active.length)];
		} else {
			let interval = 250;

			for (let i = 0; i < 10; i++) {
				winner = allParticipants.active[Math.floor(Math.random() * allParticipants.active.length)];
				await wait(interval);
				interval *= 1.1;
			}

			winner = allParticipants.active[Math.floor(Math.random() * allParticipants.active.length)];
		}
		isPicking = false;
		showConfetti = false;
		await tick();
		showConfetti = true;

		const id = nanoid();
		const result: Result = {
			_id: `result|${id}|${Date.now()}`,
			winner: winner._id.split('|')[1],
			activeParticipants: allParticipants.active.map((p) => p._id.split('|')[1]),
			created_at: Date.now()
		};
		await $pouchDB?.put(result);
	}
</script>

<div class="grid justify-items-center">
	<Button
		disabled={isPicking}
		onclick={pick}
		class="flex w-fit gap-3 bg-gradient-to-br from-purple-400 to-purple-700 px-10 py-6 text-lg hover:to-purple-900 active:to-purple-950"
		><Shuffle />Pick Name</Button
	>
	<div class="flex items-center gap-2 py-2">
		<span class="mr-4">Timing:</span>
		<input
			type="radio"
			id="instant"
			checked={timing === 'instant'}
			onchange={(e) => {
				if (e.currentTarget.checked) timing = 'instant';
			}}
		/>
		<label for="instant">Instant</label>
		<input
			class="ml-4"
			type="radio"
			id="suspense"
			checked={timing === 'suspense'}
			onchange={(e) => {
				if (e.currentTarget.checked) timing = 'suspense';
			}}
		/>
		<label for="suspense">Suspense</label>
	</div>
	<div class="grid content-center p-6">
		{#each allParticipants.active as participant}
			<span
				class={cn(
					'winner origin-center text-center text-lg font-semibold transition-all duration-700',
					winner?._id === participant._id ? 'opacity-50' : 'opacity-0',
					winner?._id === participant._id &&
						!isPicking &&
						'scale-[4] font-bold text-green-600 opacity-100'
				)}
			>
				{participant.name}
			</span>
		{/each}
	</div>
	{#if showConfetti}
		<Confetti cone amount={200} x={[-1.5, 1.5]} />
	{/if}
</div>

<style>
	.winner {
		grid-area: 1/1/2/2;
	}
</style>
