<script lang="ts">
	import Viem from '../components/Viem.svelte'
</script>


<Viem>
	{#snippet children({
		publicClient,
		walletClient,
		account,
		connectAccount,
		disconnectAccount,
	})}
		<header class="row">
			<h1>TokenGated</h1>

			<div class="row">
				{#if !account}
					<button
						onclick={connectAccount}
					>
						Connect
					</button>
				{:else}
					{account.slice(0, 6)}...{account.slice(-4)}
					<button onclick={disconnectAccount}>Disconnect</button>
				{/if}
			</div>
		</header>
	{/snippet}
</Viem>


<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}

	:global(body) {
		background-color: palegoldenrod;
	}

	header {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		padding: 2rem;
	}

	button {
		appearance: none;
		border: none;
		border-radius: 10px;
		padding: 0.5rem;
		line-height: 1;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
	}
</style>
