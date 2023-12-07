<script lang="ts">
	import { signInWithEthereum } from '$lib/siwe'


	let isSignedIn = $state(false)
	let isSigningIn = $state(false)


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
					<div>
						{#if !isSignedIn}
							<span>Connected as </span>
						{:else}
							<span>Signed in as </span>
						{/if}
						{account.slice(0, 6)}...{account.slice(-4)}
					</div>

					{#if !isSignedIn}
						{#if !isSigningIn}
							<button
								onclick={async () => {
									isSigningIn = true
									isSignedIn = await signInWithEthereum({
										publicClient,
										walletClient,
										account,
										version: '0.0.1',
									})
									isSigningIn = false
								}}
							>Sign In</button>
						{:else}
							<button
								disabled
							>
								Signing in...
							</button>
						{/if}
					{/if}

					<button
						onclick={() => {
							disconnectAccount()
							isSignedIn = false
						}}
					>Disconnect</button>
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
