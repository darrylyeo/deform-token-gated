<script lang="ts">
	// Internal state
	let isSignedIn = $state(false)
	let isSigningIn = $state(false)


	// Functions
	import { signInWithEthereum } from '$lib/siwe'


	// Components
	import Viem from '../components/Viem.svelte'


	// Pages
	import CreatePage from './create/+page.svelte'
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

		<main class="column">
			{#if !isSignedIn}
				<p>Sign in to create or access token-gated pages!</p>
			{:else}
				<CreatePage {...{
					publicClient,
					walletClient,
					account,
				}} />
			{/if}
		</main>
	{/snippet}
</Viem>


<style>
	@import '../styles.css';

	header {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		padding: 2rem;
	}

	main {
		padding: 2rem;
	}
</style>
