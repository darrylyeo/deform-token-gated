import { prepareSiweMessage, verifySiweSignature } from '$lib/siwe'
import { type Actions, fail } from '@sveltejs/kit'
import type { Address } from 'viem'
// import { createPublicClient, http, type Address } from 'viem'

// const publicClient = createPublicClient({
// 	transport: http(),
// })

export const actions: Actions = {
	request: async ({ request, locals }) => {
		const data = await request.formData();

		const userAddress = data.get('userAddress') as unknown as string

		const siweMessage = prepareSiweMessage({
			address: userAddress,
			version: '0.0.1',
			chainId: 1,
			domain: new URL(request.url).origin,
			uri: new URL(request.url).href,
		})

		console.log({siweMessage})

		await locals.session.update(data => (console.log('old data', data), {
			...data,
			siweMessage,
		}))

		console.log('request: locals.session.data', locals.session.data)

		return siweMessage
	},

	authenticate: async ({ request, locals }) => {
		const data = await request.formData()

		console.log('authenticate: locals.session.data', locals.session.data)

		const { siweMessage } = locals.session.data

		if(!siweMessage)
			return fail(400, {
				message: 'Request a message to sign first.',
			})

		const userAddress = data.get('userAddress') as unknown as Address
		const siweSignature = data.get('siweSignature') as unknown as `0x{string}` 

		const isAuthenticated = await verifySiweSignature({
			// publicClient,
			address: userAddress,
			message: siweMessage,
			signature: siweSignature,
		})

		if(!isAuthenticated)
			return fail(401, {
				message: 'Unauthorized'
			})

		await locals.session.update(data => ({
			...data,
			userAddress,
			siweMessage: undefined,
		}))

		return true
	},

	signOut: async ({ locals }) => {
		await locals.session.update(data => ({
			...data,
			userAddress: undefined,
		}))

		return true
	},
}
