<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<div class="grid gap-3 p-10">
	<h1>Hi, {data.user.username}!</h1>
	<p>Your user ID is {data.user.id}</p>
	<p>Your age is {data.user.age}</p>
	<form action="?/setAge" method="post" use:enhance>
		<input required type="number" name="age" />
		<button>Set age</button>
		{#if form?.message}
			<p>{form.message}</p>
		{/if}
	</form>
</div>
