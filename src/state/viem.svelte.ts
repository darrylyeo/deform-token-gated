// import { createPublicClient, http, createWalletClient, custom } from 'viem'
// import { mainnet, goerli } from 'viem/chains'

// export let chains = $state(
// 	[mainnet, goerli]
// )

// export let chain = $state(
// 	chains[0]
// )

// export let transport = $state(
// 	http()
// )

// export let publicClient = $derived(
// 	createPublicClient({ 
// 		chain,
// 		transport,
// 	})
// )

// export let account = $state()

// export const connect = async () => {console.log('connect')
// 	const accounts = await globalThis.ethereum.request({ 
// 		method: 'eth_requestAccounts' 
// 	})
	
// 	console.log({accounts})
// 	account = accounts[0]
// }


// export let walletTransport = $state(
// 	'ethereum' in globalThis
// 		? custom(globalThis.ethereum)
// 		: undefined
// )

// export let walletClient = $derived(
// 	walletTransport && createWalletClient({
// 		account,
// 		chain,
// 		transport: walletTransport,
// 	})
// )
