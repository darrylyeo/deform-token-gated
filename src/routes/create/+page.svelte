<script lang="ts">
	import type { Address, PublicClient, WalletClient } from 'viem'


	// Inputs
	let {
		publicClient,
		walletClient,
		account,
	} = $props<{
		publicClient: PublicClient,
		walletClient: WalletClient,
		account: Address,
	}>()


	// Compoonents
	import CreatePageForm from '../../components/CreatePageForm.svelte'
</script>


<h2>Create Token-Gated Page</h2>

<CreatePageForm
	address={account}
	chainId={publicClient.chain?.id}
/>
