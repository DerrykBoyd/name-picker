<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { nanoid } from 'nanoid';
	import { Plus } from 'lucide-svelte';
	import Participants from './participants.svelte';
	import type { Participant } from '$lib/pouch-db/schema';
	import Picker from './picker.svelte';
	import Scoreboard from './scoreboard.svelte';
	import { allParticipants, allResults, pouchDB } from './shared.svelte';

	let loading = $derived(!allParticipants.filtered || !allResults.filtered);

	const addParticipants = async (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const names = formData.get('names') as string;
		const participants = names
			.split('\n')
			.flatMap((nameOrNames) => {
				return nameOrNames.split(',').map((name) => name.trim());
			})
			.filter((name) => name.length > 0);
		participants.forEach(async (name) => {
			const id = nanoid();
			const participant: Participant = {
				_id: `participant|${id}|${Date.now()}`,
				name,
				created_at: Date.now()
			};
			await $pouchDB?.put(participant);
		});
		form.reset();
	};
</script>

<!-- Missing Things
 Keyboard shortcuts
 DEPLOY -->

<div class="grid gap-3">
	{#if loading}
		<p>Loading...</p>
	{:else}
		<Picker />
		<Scoreboard />
		<Participants />
		<form class="grid gap-2" onsubmit={addParticipants}>
			<Textarea
				class="resize-none"
				placeholder="Add names on new lines or separated by commas"
				required
				name="names"
				rows={6}
			></Textarea>
			<Button><Plus class="mr-2" />Add participants</Button>
		</form>
	{/if}
</div>
