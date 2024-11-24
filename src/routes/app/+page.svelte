<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { ActionData, PageServerData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<div class="grid gap-3 p-10">
	<h1>Hi, {data.user.username}!</h1>
	<p>Your user ID is {data.user.id}</p>
	<p>Your age is {data.user.age}</p>
	<form action="?/setAge" method="post" use:enhance>
		<Input required type="number" name="age" />
		<Button>Set age</Button>
		{#if form?.message}
			<p>{form.message}</p>
		{/if}
	</form>
</div>
