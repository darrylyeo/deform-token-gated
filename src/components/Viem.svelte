<script lang="ts">
	// Internal state
	import { type Account, createPublicClient, http, createWalletClient, custom } from 'viem'
	import { mainnet, goerli } from 'viem/chains'

	let chains = $state(
		[mainnet, goerli]
	)

	let chain = $state(
		chains[0]
	)

	let transport = $state(
		http()
	)

	let publicClient = $derived(
		createPublicClient({ 
			chain,
			transport,
		})
	)

	let account = $state<Account>()

	const connectAccount = async () => {
		const accounts = await globalThis.ethereum.request({ 
			method: 'eth_requestAccounts' 
		})
		
		account = accounts[0]
	}

	const disconnectAccount = async () => {
		account = undefined
	}
	

	let walletTransport = $state(
		'ethereum' in globalThis
			? custom(globalThis.ethereum)
			: undefined
	)

	let walletClient = $derived(
		walletTransport && createWalletClient({
			account,
			chain,
			transport: walletTransport,
		})
	)


	// Inputs/outputs
	import type { Snippet } from 'svelte'

	let { children } = $props<{
		children: Snippet<{
			publicClient: typeof publicClient,
			walletClient: typeof walletClient,
			account: typeof account,
			connectAccount: typeof connectAccount,
			disconnectAccount: typeof disconnectAccount,
		}>
	}>()
</script>


{@render children({
	publicClient,
	walletClient,
	account,
	connectAccount,
	disconnectAccount,
})}
