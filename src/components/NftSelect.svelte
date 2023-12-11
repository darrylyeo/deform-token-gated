<script lang="ts">
	import type { DetailedNftModel } from '$lib/opensea/v2'


	let {
		nfts,
	} = $props<{
		nfts: DetailedNftModel[],
	}>()
</script>


{#each nfts as nft}
	<div>
		<img src={nft.image_url} />
		<h3>{nft.name}</h3>
		<p>{nft.description}</p>
	</div>
{/each}
