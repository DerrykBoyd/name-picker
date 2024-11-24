<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="p-4">Login/Register</h1>
<form class="grid gap-4 p-4" method="post" action="?/login" use:enhance>
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<div>
		<button class="mr-4">Login</button>
		<button formaction="?/register">Register</button>
	</div>
</form>
<p style="color: red">{form?.message ?? ''}</p>
