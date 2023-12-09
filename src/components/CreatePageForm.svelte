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


	// Form handling
	import { enhance } from '$app/forms'
</script>


<form
	method="POST"
	action="/create"
	use:enhance
	class="column"
>
	<input
		type="hidden"
		name="creatorAddress"
		value={address}
	/>

	<label class="card column">
		<span>Title</span>
		<input
			type="text"
			name="title"
			bind:value={title}
		/>
	</label>

	<section class="card column">
		<span>Access Conditions</span>

		{#each conditions as condition, i (condition)}
			<div class="row">
				<div class="card row equal">
					<label class="column">
						<span>Condition Type</span>

						<select
							bind:value={condition.type}
							name="conditionType"
						>
							{#if conditions.length === 1}
								<option value={AccessConditionType.None}>None (Public)</option>
							{/if}
							<option value={AccessConditionType.OwnsNftInCollection}>Owns any NFT in collection</option>
							<option value={AccessConditionType.OwnsSingleNft}>Owns a particular NFT</option>
						</select>
					</label>

					{#if condition.type === AccessConditionType.OwnsNftInCollection || condition.type === AccessConditionType.OwnsSingleNft}
						<label class="column">
							<span>Network</span>

							<select
								bind:value={condition.chainId}
								name="chainId"
							>
								<option value={1}>Ethereum</option>
								<option value={5}>Goerli</option>
							</select>
						</label>

						<label class="column">
							<span>NFT Collection (Contract Address)</span>

							<input
								type="text"
								name="contractAddress"
								bind:value={condition.contractAddress}
								placeholder="0x..."
							/>
						</label>
					{:else}
						<input type="hidden" name="contractAddress" />
					{/if}

					{#if condition.type === AccessConditionType.OwnsSingleNft}
						<label class="column">
							<span>NFT (Token ID)</span>

							<input
								type="number"
								name="tokenId"
								bind:value={condition.tokenId}
								placeholder="0"
							/>
						</label>
					{:else}
						<input type="hidden" name="tokenId" />
					{/if}
				</div>

				{#if conditions.length > 1}
					<button
						type="button"
						onclick={() => conditions.splice(i, 1)}
					>
						Remove Condition
					</button>
				{/if}
			</div>

			{#if conditions.length > 1 && i < conditions.length - 1}
				or
			{/if}
		{/each}

		{#if !(conditions.length === 1 && conditions[0].type === AccessConditionType.None)}
			<button
				type="button"
				onclick={() => conditions.push(new AccessCondition(AccessConditionType.OwnsNftInCollection))}
			>Add Condition</button>
		{/if}
	</section>

	<label class="card column">
		<span>Content</span>

		<MarkdownInput
			bind:value={content}
			name="content"
		/>
	</label>

	<button type="submit">Create page</button>
</form>


<style>
	input, select {
		justify-self: start;
	}
</style>
