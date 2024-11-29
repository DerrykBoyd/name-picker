<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher modeStorageKey="mode" />
<div
	class="min-h-screen bg-gradient-to-br from-indigo-200 via-indigo-100 to-purple-200 pb-10 transition-colors dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900"
>
	{@render children()}
</div>
