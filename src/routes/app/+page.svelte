<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="grid gap-3 p-10">
	<h1>Hi, {data.user.username}!</h1>
	<p>Your user ID is {data.user.id}.</p>
	<p>Your age is {data.user.age}</p>
	<form method="post" action="?/logout" use:enhance>
		<button>Sign out</button>
	</form>
	<form action="?/setAge" method="post" use:enhance>
		<input type="number" name="age" />
		<button>Set age</button>
		<p>TEST</p>
	</form>
</div>
