<script lang="ts">
	import { page } from '$app/stores'


	// External state
	// import { isSignedIn, isSigningIn } from '../state/auth.svelte'


	console.log('layout', $page.data.session)
	// Internal state
	// let isSignedIn = $state(!!$page.data.session.userAddress)
	let isSigningIn = $state(false)

	// let siweMessage = $state<string>()
	let siweSignature = $state<string>()


	// Functions
	// import { signInWithEthereum } from '$lib/siwe'

	/*
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
				console.log('authenticate', {result})
				if (result.type !== 'success')
					throw result

				return result.data
			})

		console.log({isAuthenticated})

		return isAuthenticated
	}
	*/

	// $effect(() => {
	// 	if(siweMessage){
	// 		const form = document.createElement('form')
	// 		form.method = 'POST'
	// 		form.action = '/siwe?/authenticate'

	// 		const userAddress = document.createElement('input')
	// 		userAddress.type = 'hidden'
	// 		userAddress.name = 'userAddress'
	// 		userAddress.value = account

	// 		const siweSignature = document.createElement('input')
	// 		siweSignature.type = 'hidden'
	// 		siweSignature.name = 'siweSignature'
	// 		siweSignature.value = siweMessage

	// 		const version = document.createElement('input')
	// 		version.type = 'hidden'
	// 		version.name = 'version'
	// 		version.value = '0.0.1'

	// 		form.appendChild(userAddress)
	// 		form.appendChild(siweSignature)
	// 		form.appendChild(version)

	// 		document.body.appendChild(form)

	// 		form.submit()
	// 	}
	// })


	let authenticateForm = $state<HTMLFormElement>()

	// $effect(() => {
	// 	if(siweSignature){
	// 		authenticateForm?.requestSubmit()
	// 	}
	// })


	// Outputs
	import { setContext, tick, type Snippet } from 'svelte'

	// let { children } = $props<{
	// 	children: Snippet<{
	// 		isSignedIn: typeof isSignedIn,
	// 	}>,
	// }>()

	// $effect(() => {
	// 	setContext('isSignedIn', !!$page.data.session.userAddress)
	// })


	// Components
	import Viem from '../components/Viem.svelte'


	// Pages
	import CreatePage from './create/+page.svelte'
	import type { Address, PublicClient, WalletClient } from 'viem';
	import { deserialize, enhance } from '$app/forms'
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
										console.log('request', {result})

										if(result.type !== 'success')
											throw result

										const siweMessage = result.data as unknown as string
										
										siweSignature = await walletClient.signMessage({
											account,
											message: siweMessage,
										})

										await update()

										// await tick()
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
								use:enhance={({ formElement, formData, action, cancel, submitter }) => {
									return async ({ result, update }) => {
										console.log('authenticate', {result})

										if(result.type !== 'success')
											throw result

										const isAuthenticated = result.data as unknown as boolean

										console.log({ isAuthenticated })

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
							use:enhance={({ formElement, formData, action, cancel, submitter }) => {
								return async ({ result, update }) => {
									console.log('sign-out', {result})

									if(result.type !== 'success')
										throw result

									const isSignedOut = result.data as unknown as boolean

									console.log({ isSignedOut })

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
			<!-- {@render children({
				isSignedIn,
			})} -->
			<slot />


			<!-- {#if !isSignedIn} -->
				<p>Sign in to create or access token-gated pages!</p>
			<!-- {:else} -->
				<!-- <CreatePage {...{
					publicClient,
					walletClient,
					account,
				}} /> -->
			<!-- {/if} -->
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
