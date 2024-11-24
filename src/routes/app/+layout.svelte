<script>
	import { enhance } from '$app/forms';

	let { children } = $props();
</script>

<header class="flex justify-between p-4">
	<h1>Name Picker</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/app">App</a>
	</nav>
	<form action="?/logout" method="post" use:enhance>
		<button>Sign out</button>
	</form>
</header>
{@render children()}
