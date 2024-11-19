<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	let count = $state(0);

	$effect(() => {
		console.log('count changed', count);
	});
</script>

<h1>Hi, {data.user.username}!</h1>
<p>Your user ID is {data.user.id}.</p>
<p>Your age is {data.user.age}</p>
<p>The count is {count}</p>
<button onclick={() => (count += 2)}>inc</button>
<form method="post" action="?/logout" use:enhance>
	<button>Sign out</button>
</form>
<form action="?/setAge" method="post">
	<input type="number" name="age" />
	<button>Set age</button>
</form>
