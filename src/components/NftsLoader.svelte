<script lang="ts">
	import type { Snippet } from 'svelte';
	import { listNftsByAccount, type DetailedNftModel } from '../lib/opensea/v2'
	import type { Address } from 'viem';


	let {
		address,
		chainId,
		children,
	} = $props<{
		address: Address,
		chainId: number,
		children: Snippet<{
			nfts: DetailedNftModel[],
		}>,
	}>()
</script>


{#await listNftsByAccount(address, 'ethereum').then(({ nfts }) => nfts)}
	<p>Loading NFTs owned by {address}...</p>
{:then nfts}
	{@render children({
		nfts,
	})}
{:catch error}
	<p>{error.message}</p>
{/await}
