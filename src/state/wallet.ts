// import { configureChains } from '@wagmi/core'
// import type { PublicClient } from 'viem'
// import { mainnet, goerli } from 'viem/chains'
// import { publicProvider } from '@wagmi/core/providers/public'

// import { connect } from '@wagmi/core'
// import { InjectedConnector } from '@wagmi/core/connectors/injected'


// export const chains = $state([mainnet, goerli])

// export const config = $derived(
// 	configureChains(
// 		chains,
// 		[publicProvider()],
// 	)
// )


// export let publicClient = $state<PublicClient | undefined>()

// $effect(() => {
// 	(async () => {
// 		({ walletC } = await connect({
// 			connector: new InjectedConnector(),
// 		}))
// 	})()
// })

// const [address] = await client.getAddresses()
