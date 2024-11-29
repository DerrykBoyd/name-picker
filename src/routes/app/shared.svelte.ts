import type { Participant, Result } from '$lib/pouch-db/schema';
// import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export const pouchDB = writable<PouchDB.Database | null>(null);

export const allParticipants = $state<{
	includingDeleted: Array<Participant>;
	filtered: Array<Participant>;
	active: Array<Participant>;
}>({
	includingDeleted: [], // includes deleted
	filtered: [], // excludes deleted
	active: [] // excludes deleted and excluded
});
export const setAllParticipants = (participants: Array<Participant>) => {
	allParticipants.includingDeleted = participants;
	allParticipants.filtered = participants.filter((p) => !p.deleted);
	allParticipants.active = participants.filter((p) => !p.deleted && !p.excluded);
};

export const allResults = $state<{ includingDeleted: Array<Result>; filtered: Array<Result> }>({
	includingDeleted: [], // includes deleted
	filtered: []
});
export const setAllResults = (results: Array<Result>) => {
	allResults.includingDeleted = results;
	allResults.filtered = results
		.filter((r) => !r.deleted)
		.sort((a, b) => b.created_at - a.created_at);
};
