<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import type { LayoutData } from './$types';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { page } from '$app/stores';
	import type { Participant, Result } from '$lib/pouch-db/schema';
	import { getUniqueDocs } from '$lib/pouch-db/utils';
	import { pouchDB, setAllParticipants, setAllResults } from './shared.svelte';
	import { cn } from '$lib/utils';
	import { browser } from '$app/environment';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let sync: PouchDB.Replication.Sync<{}>;

	function syncParticipants(db: PouchDB.Database<{}>) {
		db.allDocs({
			include_docs: true,
			startkey: `participant|`,
			endkey: `participant|\uffff`
		}).then((result) => {
			const all = result.rows.map((row: any) => row.doc as Participant);
			setAllParticipants(getUniqueDocs(all));
		});
	}

	function syncResults(db: PouchDB.Database<{}>) {
		db.allDocs({
			include_docs: true,
			startkey: `result|`,
			endkey: `result|\uffff`
		}).then((result) => {
			const all = result.rows.map((row: any) => row.doc as Result);
			setAllResults(getUniqueDocs(all));
		});
	}

	async function startSync() {
		if (browser) {
			const db = new PouchDB(`name-picker-${data.user.id}`);
			const remoteDB = new PouchDB(new URL(`/couch/name-picker-${data.user.id}`, $page.url).href);
			if (sync) sync.cancel();
			sync = db
				.sync(remoteDB, {
					live: true,
					retry: true
				})
				.on('change', function (change) {
					syncParticipants(db);
					syncResults(db);
				})
				.on('paused', function (info) {
					// replication was paused, usually because of a lost connection
				})
				.on('denied', function (info) {
					console.error('PouchDB denied', info);
				})
				.on('error', function (err) {
					console.error('PouchDB error', err);
				});

			// Load participants
			syncParticipants(db);
			syncResults(db);

			pouchDB.set(db);
		}
	}

	onMount(() => {
		startSync();
	});

	import.meta.hot?.dispose(() => {
		sync?.cancel();
	});

	onDestroy(() => {
		sync?.cancel();
	});
</script>

<svelte:window onfocus={() => startSync()} />

{#snippet navLink(pathname: string, text: string)}
	<a
		class={cn(
			$page.url.pathname === pathname && 'border-b  text-purple-700 underline dark:text-purple-300'
		)}
		href={pathname}>{text}</a
	>
{/snippet}

<div class="mx-4 sm:mx-8">
	<div class="mx-auto max-w-screen-lg space-y-2">
		<header class="box-border flex w-full flex-wrap items-center gap-6 py-4">
			<h1 class="flex-1 text-left font-bold">Name Picker</h1>
			<nav class="flex items-center gap-4">
				{@render navLink('/', 'Home')}
				{@render navLink('/app', 'Picker')}
				{@render navLink('/app/results', 'Results')}
			</nav>

			<Button onclick={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			<form action="/app?/logout" method="post" use:enhance>
				<Button>Sign out</Button>
			</form>
		</header>
		{@render children()}
	</div>
</div>
