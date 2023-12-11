import type { AccessConditionType, SerializedAccessCondition } from '$lib/AccessCondition.svelte'
import type { Address } from 'viem'
import type { Actions } from './$types'

import { client, e } from '../../database/client'
import { error, redirect } from '@sveltejs/kit'


export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const creatorAddress = data.get('creatorAddress') as unknown as Address
		const title = data.get('title') as unknown as string
		const content = data.get('content') as unknown as string
		const conditionTypes = data.getAll('conditionType').map(conditionType => conditionType as AccessConditionType)
		const chainIds = data.getAll('chainId').map(chainId => chainId ? Number(chainId) : undefined)
		const contractAddresses = data.getAll('contractAddress').map(contractAddress => contractAddress ? contractAddress as Address : undefined)
		const tokenIds = data.getAll('tokenId').map(tokenId => tokenId ? Number(tokenId) : undefined)

		const conditions: SerializedAccessCondition[] = conditionTypes.map((type, i) => ({
			type,
			chainId: chainIds[i] ?? null,
			contractAddress: contractAddresses[i] ?? null,
			tokenId: tokenIds[i] ?? null,
		}))

		console.log({
			creatorAddress,
			title,
			content,
			conditions,
		})


		const newPage = await (
			e.params({
				creatorAddress: e.Address,
				title: e.str,
				content: e.str,
				conditions: e.json,
			}, ({
				creatorAddress,
				title,
				content,
				conditions,
			}) => (
				e.insert(e.Page, {
					creatorAddress: e.cast(e.Address, creatorAddress),
					title,
					content,
					conditions: e.for(e.json_array_unpack(conditions), (condition) => (
						e.insert(e.AccessCondition, {
							conditionType: e.cast(e.AccessConditionType, condition.type),
							chainId: e.cast(e.int16, condition.chainId),
							contractAddress: e.cast(e.Address, condition.contractAddress),
							tokenId: e.cast(e.bigint, condition.tokenId),
						})
					))
				})
			))
		)
			.run(client, {
				creatorAddress,
				title,
				content,
				conditions,
			})
			.catch(e => {
				console.error(e)
				throw error(500, e.message)
			})
	
		return {
			message: `Successfully created a new token-gated page!`,
			pageId: newPage.id,
			redirectTo: `/page/${newPage.id}`,
		}
	},
} satisfies Actions
