<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';

	let { children } = $props();
</script>

<header class="flex justify-between p-4">
	<h1>Name Picker</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/app">App</a>
	</nav>

	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
	<form action="?/logout" method="post" use:enhance>
		<Button>Sign out</Button>
	</form>
</header>
{@render children()}
