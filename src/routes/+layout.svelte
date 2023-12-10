<script lang="ts">
	import { page } from '$app/stores'


	// Internal state
	let authenticateForm = $state<HTMLFormElement>()
	let isSigningIn = $state(false)
	let siweSignature = $state<string>()


	// Functions
	// import { signInWithEthereum } from '$lib/siwe'

	/*
	import type { Address, PublicClient, WalletClient } from 'viem'

	const formDataFromObject = (obj: Record<string, string>) => {
		const formData = new FormData()

		for (const [key, value] of Object.entries(obj)) {
			formData.append(key, value)
		}

		return formData
	}

	const signInWithEthereum = async ({
		publicClient,
		walletClient,
		account: userAddress,
		version,
	}: {
		publicClient: PublicClient,
		walletClient: WalletClient,
		account: Address,
		version: string,
	}) => {
		const preparedMessage = await fetch(`/siwe?/request`, {
			method: 'POST',
			body: new FormData(),
		})
			.then(response => response.text())
			.then(deserialize)
			.then((result) => {
				if (result.type !== 'success')
					throw result

				return result.data
			})

		const siweSignature = await walletClient.signMessage({
			account: userAddress,
			message: preparedMessage,
		})
		
		const isAuthenticated = await fetch(`/siwe?/authenticate`, {
			method: 'POST',
			body: new URLSearchParams({
				userAddress,
				siweSignature,
				account: userAddress,
				version,
			}),
		})
			.then(response => response.text())
			.then(deserialize)
			.then((result) => {
				if (result.type !== 'success')
					throw result

				return result.data
			})

		return isAuthenticated
	}
	*/


	// Components
	import Viem from '../components/Viem.svelte'


	// Pages
	import { enhance } from '$app/forms'
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
				{#if !$page.data.session.userAddress && !account}
					<button
						onclick={connectAccount}
					>
						Connect
					</button>
				{:else}
					<div>
						{#if $page.data.session.userAddress}
							<span>Signed in as {$page.data.session.userAddress}</span>
						{:else if account}
							<span>Connected as {account.slice(0, 6)}...{account.slice(-4)}</span>
						{/if}
					</div>

					{#if !$page.data.session.userAddress}
						{#if !isSigningIn}
							<!-- <button
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
							>Sign In</button> -->

							<form
								method="POST"
								action="/siwe?/request"
								use:enhance={({ formElement, formData, action, cancel, submitter }) => {
									isSigningIn = true

									return async ({ result, update }) => {
										if(result.type !== 'success')
											throw result

										const siweMessage = result.data as unknown as string
										
										siweSignature = await walletClient.signMessage({
											account,
											message: siweMessage,
										})

										await update()

										authenticateForm?.requestSubmit()
									}
								}}
							>
								<input
									type="hidden"
									name="userAddress"
									value={account}
								/>

								<button type="submit">Sign In</button>
							</form>
						{:else}
							<form
								method="POST"
								action="/siwe?/authenticate"
								bind:this={authenticateForm}
								use:enhance={() => {
									return async ({ result, update }) => {
										if(result.type !== 'success')
											throw result

										const isAuthenticated = result.data as unknown as boolean

										await update()

										isSigningIn = false
									}
								}}
							>
								<input
									type="hidden"
									name="userAddress"
									value={account}
								/>

								<input
									type="hidden"
									name="siweSignature"
									value={siweSignature}
								/>

								<button
									disabled
								>
									Signing in...
								</button>
							</form>
						{/if}
					{/if}

					{#if account}
						<button
							onclick={() => {
								disconnectAccount()
								isSigningIn = false
							}}
						>Disconnect</button>
					{/if}

					{#if $page.data.session.userAddress}
						<form
							method="POST"
							action="/siwe?/signOut"
							use:enhance={() => {
								return async ({ result, update }) => {
									if(result.type !== 'success')
										throw result

									const isSignedOut = result.data as unknown as boolean

									await update()
								}
							}}
						>
							<button
								type="submit"
							>
								Sign Out
							</button>
						</form>
					{/if}
				{/if}
			</div>
		</header>

		<main class="column">
			<slot />
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
