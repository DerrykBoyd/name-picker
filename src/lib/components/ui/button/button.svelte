<script lang="ts">
	import { type Props, buttonVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = Props;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export { className as class };
</script>

<button class={cn(buttonVariants({ variant, size, className }))} {...$$restProps}>
	<slot />
</button>
