<script lang="ts">
	// Context
	import { page } from '$app/stores'


	// Compoonents
	import CreatePageForm from '../../components/CreatePageForm.svelte'
</script>


<h2>Create Token-Gated Page</h2>

{#if !$page.data.session.userAddress}
	Sign in to create or access token-gated pages!
{:else}
	<CreatePageForm
		address={$page.data.session.userAddress}
	/>
{/if}
