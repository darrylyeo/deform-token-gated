<script lang="ts">
	// Constants/types
	import type { Address } from 'viem'


	// Inputs
	let {
		address,
		chainId,
	} = $props<{
		address: Address,
		chainId: number,
	}>()


	// Internal state
	let title = $state('')
	let content = $state('')
</script>


<form class="column">
	<label class="column">
		<span>Page Title</span>
		<input type="text" bind:value={title} />
	</label>

	<label class="column">
		<span>Content</span>
		<textarea
			bind:value={content}
		/>
	</label>

	<button type="submit">Create page</button>
</form>
