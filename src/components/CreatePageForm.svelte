<script lang="ts">
	// Constants/types
	import type { Address } from 'viem'
	import { AccessCondition, AccessConditionType } from '$lib/AccessCondition.svelte'


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
	let conditions = $state<AccessCondition[]>([
		new AccessCondition(),
	])


	// Components
	import MarkdownInput from './MarkdownInput.svelte'
</script>


<form class="column">
	<label class="card column">
		<span>Title</span>
		<input type="text" bind:value={title} />
	</label>

	<section class="card column">
		<span>Access Conditions</span>

		{#each conditions as condition, i (condition)}
			<div class="row">
				<div class="card row equal">
					<label class="column">
						<span>Condition Type</span>

						<select bind:value={condition.type}>
							<option value={AccessConditionType.None}>None (Public)</option>
							<option value={AccessConditionType.OwnsNftInCollection}>Owns any NFT in collection</option>
							<option value={AccessConditionType.OwnsSingleNft}>Owns a particular NFT</option>
						</select>
					</label>

					{#if condition.type === AccessConditionType.OwnsNftInCollection || condition.type === AccessConditionType.OwnsSingleNft}
						<label class="column">
							<span>NFT Collection (Contract Address)</span>

							<input
								type="text"
								bind:value={condition.contractAddress}
								placeholder="0x..."
							/>
						</label>
					{/if}

					{#if condition.type === AccessConditionType.OwnsSingleNft}
						<label class="column">
							<span>NFT (Token ID)</span>

							<input
								type="number"
								bind:value={condition.tokenId}
								placeholder="0"
							/>
						</label>
					{/if}
				</div>

				{#if conditions.length > 1}
					<button
						onclick={() => conditions.splice(i, 1)}
					>
						Remove Condition
					</button>
				{/if}
			</div>
		{/each}

		<button
			onclick={() => conditions.push(new AccessCondition())}
		>Add Condition</button>
	</section>

	<label class="card column">
		<span>Content</span>
		<MarkdownInput
			bind:value={content}
		/>
	</label>

	<button type="submit">Create page</button>
</form>


<style>
	input, select {
		justify-self: start;
	}
</style>
