<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="grid min-h-screen w-full place-content-center">
	<h1 class="p-4 text-xl font-bold">Login/Register</h1>
	<form class="grid w-80 gap-4 p-4" method="post" action="?/login" use:enhance>
		<label>
			Username
			<Input name="username" />
		</label>
		<label>
			Password
			<Input type="password" name="password" />
		</label>
		<div>
			<Button class="mr-4">Login</Button>
			<Button variant="outline" formaction="?/register">Register</Button>
		</div>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
